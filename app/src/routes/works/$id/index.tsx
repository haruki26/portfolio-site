import { createFileRoute, notFound } from '@tanstack/react-router'
import { Clock9 } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import Button from '@/components/ui/Button'
import DateViewer from '@/components/ui/DateViewer'
import Divider from '@/components/ui/Divider'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import ArticleOverview from '@/features/article/components/ArticleOverview'
import HtmlViewer from '@/features/article/components/HtmlViewer'
import { getWork } from '@/features/article/work/functions'
import { createArticleJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/works/$id/')({
  loader: async ({ params }) => {
    const data = await getWork({ data: { id: params.id } })

    if (data.resultType === 'fail') {
      throw new Error(data.error.message)
    }

    if (data.value === null) {
      throw notFound()
    }

    return data.value
  },
  head: ({ loaderData, params }) =>
    loaderData !== undefined
      ? generateHead({
          title: `${loaderData.title} | ${SEO.title}`,
          description: loaderData.description,
          image: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
          url: `${SEO.url}/works/${params.id}`,
          type: 'article',
          jsonLD: createArticleJsonLD({
            title: loaderData.title,
            thumbnailSrc: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
            publishedAt: loaderData.publishedAt,
            authorName: `${MY_INFO.lastName}${MY_INFO.firstName}`,
          }),
        })
      : {},
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <article className="flex w-full flex-col gap-10 px-2">
        <h1 className="sr-only">{data.title}</h1>
        <ArticleOverview article={data} />
        <Divider className="to-secondary-100" />
        <HtmlViewer htmlString={data.body} />
        <div className="mx-auto flex flex-row items-center gap-5 text-base-content-muted text-lg">
          <span>更新日</span>
          <LabelWithIcon Icon={() => <Clock9 className="h-5 w-5" />}>
            <DateViewer date={data.updatedAt} />
          </LabelWithIcon>
        </div>
      </article>
      <Button type="link" path={{ to: '..' }} className="px-10 py-3 text-xl">
        All Works
      </Button>
    </div>
  )
}

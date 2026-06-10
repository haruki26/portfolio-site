import { createFileRoute, notFound } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { getBlog } from '@/features/article/blog/functions'
import { createArticleJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/blogs/$id/')({
  loader: async ({ params }) => {
    const data = await getBlog({ data: { id: params.id } })

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
          url: `${SEO.url}/blogs/${params.id}`,
          type: 'article',
          jsonLD: createArticleJsonLD({
            title: loaderData.title,
            thumbnailSrc: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
            publishedAt: loaderData.publishedAt,
            authorName: `${MY_INFO.lastName}${MY_INFO.firstName}`,
          }),
        })
      : {},
})

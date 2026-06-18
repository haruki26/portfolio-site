import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import z from 'zod'
import Pagination from '@/components/ui/Pagination'
import { MY_INFO } from '@/configs/myInfo'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import ArticleCards from '@/features/article/components/ArticleCards'
import { getWorks } from '@/features/article/work/functions'
import { createCollectionJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
})

export const Route = createFileRoute('/works/')({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ ...search }),
  beforeLoad: async ({ search: { page } }) => {
    const result = await getWorks({
      data: { limit: LIST_ARTICLES_NUM, currentPage: page },
    })

    if (result.resultType === 'fail') {
      throw new Error(result.error.message)
    }

    const { totalCount, contents } = result.value

    const maxPage = Math.max(Math.ceil(totalCount / LIST_ARTICLES_NUM), 1)

    if (maxPage < page) {
      throw redirect({
        to: '.',
        search: {
          page: maxPage,
        },
      })
    }

    return { totalCount, contents }
  },
  loader: async ({ context: { contents, totalCount }, deps: { page } }) => ({
    page,
    totalCount,
    works: contents,
  }),
  head: ({ loaderData }) =>
    generateHead({
      title: `成果物一覧 | ${SEO.title}`,
      description: '成果物に関する記事の一覧ページです。',
      url: `${SEO.url}/works?page=${loaderData?.page ?? 1}`,
      image: MY_INFO.iconImage,
      type: 'website',
      jsonLD: createCollectionJsonLD({
        name: '成果物記事一覧',
        url: `${SEO.url}/works?page=${loaderData?.page ?? 1}`,
      }),
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { totalCount, works, page } = Route.useLoaderData()

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <section>
        <h2 className="sr-only">All works</h2>
        <ArticleCards
          articleType="work"
          articles={works}
          className="md:grid-cols-2"
        />
      </section>
      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageLimit={LIST_ARTICLES_NUM}
        LinkComponent={({ children, navTo }) => (
          <Link
            to="."
            search={{
              page: navTo,
            }}
          >
            {children}
          </Link>
        )}
        className="px-8"
      />
    </div>
  )
}

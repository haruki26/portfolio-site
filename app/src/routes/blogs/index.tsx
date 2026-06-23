import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import z from 'zod'
import Pagination from '@/components/ui/Pagination'
import { MY_INFO } from '@/configs/myInfo'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getBlogs } from '@/features/article/blog/functions'
import ArticleCards from '@/features/article/components/ArticleCards'
import { createCollectionJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
})

export const Route = createFileRoute('/blogs/')({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ ...search }),
  beforeLoad: async ({ search: { page } }) => {
    const result = await getBlogs({
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
  loader: async ({ context: { totalCount, contents }, deps: { page } }) => ({
    page,
    totalCount,
    blogs: contents,
  }),
  head: ({ loaderData }) =>
    generateHead({
      title: `ブログ一覧 | ${SEO.title}`,
      description: 'ブログの一覧ページです。',
      url: `${SEO.url}/blogs?page=${loaderData?.page ?? 1}`,
      image: MY_INFO.iconImage,
      type: 'website',
      jsonLD: createCollectionJsonLD({
        name: 'ブログ一覧',
        url: `${SEO.url}/blogs?page=${loaderData?.page ?? 1}`,
      }),
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { totalCount, blogs, page } = Route.useLoaderData()

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <section>
        <h2 className="sr-only">All blogs</h2>
        <div className="flex flex-col gap-5 px-4">
          <ArticleCards
            articleType="blog"
            articles={blogs}
            className="md:grid-cols-2"
          />
        </div>
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

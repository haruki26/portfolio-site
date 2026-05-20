import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Pagination from '@/components/ui/Pagination'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { getBlogsOptions } from '@/features/article/blog/api'
import ArticleCards from '@/features/article/components/ArticleCards'
export const Route = createLazyFileRoute('/blogs/')({
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()

  const {
    data: { totalCount, contents: blogs },
  } = useSuspenseQuery(
    getBlogsOptions({
      limit: LIST_ARTICLES_NUM,
      currentPage: search.page,
    }),
  )

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
        currentPage={search.page}
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

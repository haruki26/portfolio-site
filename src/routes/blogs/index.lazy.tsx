import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Pagination from '@/components/ui/Pagination'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { getBlogsOptions } from '@/features/article/blog/api'
import ArticleCard from '@/features/article/components/ArticleCard'

export const Route = createLazyFileRoute('/blogs/')({
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()

  const {
    data: { totalCount, blogs },
  } = useSuspenseQuery(
    getBlogsOptions({
      limit: LIST_ARTICLES_NUM,
      currentPage: search.page,
    }),
  )

  return (
    <div className="flex w-full flex-col gap-8">
      <section>
        <h1 className="sr-only">All blogs</h1>
        <div className="flex flex-col gap-5 px-4">
          {blogs.map((blog) => (
            <Link key={blog.id} to="/blogs/$id" params={{ id: blog.id }}>
              <ArticleCard article={blog} />
            </Link>
          ))}
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

import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Pagination from '@/components/ui/Pagination'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import ArticleCards from '@/features/article/components/ArticleCards'
export const Route = createLazyFileRoute('/blogs/')({
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

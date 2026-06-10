import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Pagination from '@/components/ui/Pagination'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import ArticleCards from '@/features/article/components/ArticleCards'

export const Route = createLazyFileRoute('/works/')({
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

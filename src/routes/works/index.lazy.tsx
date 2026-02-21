import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Pagination from '@/components/ui/Pagination'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import ArticleCard from '@/features/article/components/ArticleCard'
import { getWorksOptions } from '@/features/article/work/api'

export const Route = createLazyFileRoute('/works/')({
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()

  const {
    data: { totalCount, works },
  } = useSuspenseQuery(
    getWorksOptions({
      limit: LIST_ARTICLES_NUM,
      currentPage: search.page,
    }),
  )

  return (
    <div className="flex w-full flex-col gap-8">
      <section>
        <div className="flex flex-col gap-5 px-4">
          {works.map((work) => (
            <Link key={work.id} to="/works/$id" params={{ id: work.id }}>
              <ArticleCard article={work} />
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

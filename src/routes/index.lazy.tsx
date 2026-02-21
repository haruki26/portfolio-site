import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import AboutCard from '@/features/about/components/AboutCard'
import ArticleCard from '@/features/article/components/ArticleCard'
import { getWorksOptions } from '@/features/article/work/api'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: { works },
  } = useSuspenseQuery(getWorksOptions({ limit: TOP_ARTICLE_NUM }))

  return (
    <div className="flex w-full flex-col items-center gap-16 px-3 py-3">
      <div className="flex flex-col items-center gap-8 text-shadow-lg/40 text-shadow-secondary-100">
        <h1 className="font-orbitron text-5xl">Welcome</h1>
        <p className="wrap-anywhere flex flex-col gap-0.5 break-keep bg-base-300/5 text-center text-xl">
          このサイトは 私のプロフィールや 作品についてまとめています
        </p>
      </div>
      <Section sectionLabel="About">
        <AboutCard />
      </Section>
      <Section sectionLabel="Works">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="grid grid-cols-1 gap-7">
            {works.map((work) => (
              <Link key={work.id} to="/works/$id" params={{ id: work.id }}>
                <ArticleCard article={work} />
              </Link>
            ))}
          </div>
          <Link to="/works" search={{ page: 1 }}>
            <Button className="w-48 py-3 text-xl">All Works</Button>
          </Link>
        </div>
      </Section>
    </div>
  )
}

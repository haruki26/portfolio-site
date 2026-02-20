import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import ArticleOverview from '@/features/article/components/ArticleOverview'
import { getWorksOptions } from '@/features/article/work/api'
import AboutCard from './-components/AboutCard'
import WelcomeView from './-components/WelcomeView'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: { works },
  } = useSuspenseQuery(getWorksOptions({ limit: TOP_ARTICLE_NUM }))

  return (
    <div className="flex w-full flex-col items-center gap-10 px-3 py-3">
      <WelcomeView />
      <AboutCard />
      <Section sectionLabel="Works">
        <div className="flex flex-col gap-5">
          {works.map((work) => (
            <div key={work.id}>
              <ArticleOverview article={work} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

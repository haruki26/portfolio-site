import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { getWorksOptions } from '@/features/work/api'
import AboutCard from './-components/AboutCard'
import WelcomeView from './-components/WelcomeView'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const works = await queryClient.ensureQueryData(
      getWorksOptions({ limit: TOP_ARTICLE_NUM }),
    )
    return {
      works: works.works,
    }
  },
  component: App,
})

function App() {
  const {
    data: { works },
  } = useSuspenseQuery(getWorksOptions({ limit: TOP_ARTICLE_NUM }))

  return (
    <div className="flex w-full flex-col items-center gap-10 px-3 py-3">
      <WelcomeView />
      <AboutCard />
      {works.map((work) => (
        <div key={work.id}>
          <span>{work.title}</span>
          <span>{work.publishedAt.getDay()}</span>
        </div>
      ))}
    </div>
  )
}

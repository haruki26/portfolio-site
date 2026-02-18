import { createFileRoute } from '@tanstack/react-router'
import AboutCard from './-components/AboutCard'
import WelcomeView from './-components/WelcomeView'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-3 py-3">
      <WelcomeView />
      <AboutCard />
    </div>
  )
}

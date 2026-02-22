import { useSuspenseQueries } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import {
  getCertificationsOptions,
  getHobbiesOptions,
} from '@/features/about/api'
import CertificationCard from '@/features/about/components/CertificationCard'
import HobbyCard from '@/features/about/components/HobbyCard'
import Profile from '@/features/about/components/Profile'

export const Route = createLazyFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [{ data: certifications }, { data: hobbies }] = useSuspenseQueries({
    queries: [getCertificationsOptions(), getHobbiesOptions()],
  })

  return (
    <div className="flex flex-col gap-10">
      <Section sectionLabel="Profile">
        <Profile />
      </Section>
      <Section sectionLabel="Certification">
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-5">
          {certifications
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((c) => (
              <CertificationCard key={Math.random()} certification={c} />
            ))}
        </div>
      </Section>
      <Section sectionLabel="Hobby">
        <div className="flex flex-col items-center gap-5 px-5">
          {hobbies.map((hobby) => (
            <HobbyCard key={Math.random()} hobby={hobby} />
          ))}
        </div>
      </Section>
    </div>
  )
}

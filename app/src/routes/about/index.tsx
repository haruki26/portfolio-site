import { createFileRoute } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import CertificationCard from '@/features/about/components/CertificationCard'
import HobbyCard from '@/features/about/components/HobbyCard'
import Profile from '@/features/about/components/Profile'
import { getCertifications, getHobbies } from '@/features/about/functions'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/about/')({
  loader: async () => {
    const [certifications, hobbies] = await Promise.all([
      getCertifications(),
      getHobbies(),
    ])

    if (certifications.resultType === 'fail' || hobbies.resultType === 'fail') {
      throw new Error('Failed to load certifications or hobbies')
    }

    return {
      certifications: certifications.value.contents,
      hobbies: hobbies.value.contents,
    }
  },
  head: () =>
    generateHead({
      title: `プロフィール | ${SEO.title}`,
      description: '久保陽生のプロフィール。取得資格や趣味について記載します。',
      image: MY_INFO.avatarImage,
      url: `${SEO.url}/about`,
      type: 'profile',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { certifications, hobbies } = Route.useLoaderData()

  return (
    <div className="flex flex-col items-center gap-10 md:gap-20">
      <Section sectionLabel="Profile">
        <Profile />
      </Section>
      <Section sectionLabel="Certification">
        <div className="flex max-w-3xl flex-row flex-wrap items-center justify-center gap-x-5 gap-y-7">
          {certifications
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((c, i) => (
              <CertificationCard
                key={`${i}-${c.date.toString()}`}
                certification={c}
              />
            ))}
        </div>
      </Section>
      <Section sectionLabel="Hobby">
        <div className="flex flex-row flex-wrap items-center justify-center gap-5 px-5">
          {hobbies.map((hobby, i) => (
            <HobbyCard key={`${i}-${hobby.name}`} hobby={hobby} />
          ))}
        </div>
      </Section>
    </div>
  )
}

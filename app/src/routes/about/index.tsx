import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
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
})

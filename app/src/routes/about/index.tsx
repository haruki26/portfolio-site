import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import {
  getCertificationsOptions,
  getHobbiesOptions,
} from '@/features/about/api'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/about/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(getCertificationsOptions()),
      queryClient.ensureQueryData(getHobbiesOptions()),
    ])
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

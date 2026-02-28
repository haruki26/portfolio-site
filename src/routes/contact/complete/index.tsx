import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/contact/complete/')({
  head: () =>
    generateHead({
      title: `お問い合わせ完了 | ${SEO.title}`,
      description: 'お問い合わせが完了しました',
      image: MY_INFO.iconImage,
      url: `${SEO.url}/contact/complete`,
      type: 'website',
    }),
})

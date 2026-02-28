import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/contact/')({
  head: () =>
    generateHead({
      title: `お問い合わせ | ${SEO.title}`,
      description: `お問い合わせはこちらから。`,
      image: MY_INFO.iconImage,
      url: `${SEO.url}/contact`,
      type: 'website',
    }),
})

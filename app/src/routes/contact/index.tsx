import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import ContactForm from '@/features/contact/components/ContactForm'
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
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center px-4">
      <ContactForm />
    </div>
  )
}

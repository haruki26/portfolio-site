import { createFileRoute } from '@tanstack/react-router'
import Glass from '@/components/ui/Glass'
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
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Glass className="mx-5 flex min-h-full flex-col items-center gap-5">
        <h2 className="text-center font-bold text-3xl">送信が完了しました</h2>
        <p className="text-base-content-muted text-sm">
          まさかURL直打ちで来てないよね...?
        </p>
      </Glass>
    </div>
  )
}

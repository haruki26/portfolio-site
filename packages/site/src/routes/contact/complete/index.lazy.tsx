import { createLazyFileRoute } from '@tanstack/react-router'
import Glass from '@/components/ui/Glass'

export const Route = createLazyFileRoute('/contact/complete/')({
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

import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Clock9 } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import Button from '@/components/ui/Button'
import DateViewer from '@/components/ui/DateViewer'
import Divider from '@/components/ui/Divider'
import ArticleOverview from '@/features/article/components/ArticleOverview'
import HtmlViewer from '@/features/article/components/HtmlViewer'
import { getWorkOptions } from '@/features/article/work/api'

export const Route = createLazyFileRoute('/works/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data } = useSuspenseQuery(getWorkOptions(params.id))

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <article className="flex w-full flex-col gap-10 px-2">
        <ArticleOverview article={data} />
        <Divider className="to-secondary-100" />
        <HtmlViewer htmlString={data.body} />
      </article>
      <div className="flex flex-row items-center gap-5 text-base-content-muted text-lg">
        <span>更新日</span>
        <LabelWithIcon Icon={() => <Clock9 className="h-5 w-5" />}>
          <DateViewer date={data.updatedAt} />
        </LabelWithIcon>
      </div>
      <Link to=".." search={(old) => old}>
        <Button className="px-10 py-3 text-xl">All Works</Button>
      </Link>
    </div>
  )
}

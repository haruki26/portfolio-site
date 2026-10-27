import { ClockArrowUp } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import DateViewer from '@/components/ui/DateViewer'
import Glass from '@/components/ui/Glass'
import type { ArticleOverview as ArticleOverview_ } from '../../shared/types'

interface Props {
  article: Omit<ArticleOverview_, 'id'>
}

const ArticleOverview: React.FC<Props> = ({ article }) => {
  return (
    <div className="flex w-full flex-col items-center gap-8 px-5 md:px-10">
      {article.thumbnail && (
        <img
          src={article.thumbnail.src}
          alt={article.thumbnail.alt ?? `${article.title}-サムネイル`}
          width={article.thumbnail.width}
          height={article.thumbnail.height}
          className="shadow-secondary-200/60 w-1/2 rounded-xl shadow-lg"
        />
      )}
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-shadow-primary-300/80 w-full text-center text-3xl font-bold wrap-anywhere break-keep text-shadow-lg">
          {article.title}
        </h2>
        <div className="text-base-content-muted flex gap-5 text-lg">
          <span>公開日</span>
          <LabelWithIcon Icon={() => <ClockArrowUp className="h-5 w-5" />}>
            <DateViewer date={article.publishedAt} />
          </LabelWithIcon>
        </div>
      </div>
      <Glass className="max-w-xl p-5">
        <p className="w-full text-xl wrap-anywhere break-keep">
          {article.description}
        </p>
      </Glass>
    </div>
  )
}

export default ArticleOverview

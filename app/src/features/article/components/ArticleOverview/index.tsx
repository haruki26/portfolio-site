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
          className="w-1/2 rounded-xl shadow-lg shadow-secondary-200/60"
        />
      )}
      <div className="flex flex-col items-center gap-3">
        <h2 className="wrap-anywhere w-full break-keep text-center font-bold text-3xl text-shadow-lg text-shadow-primary-300/80">
          {article.title}
        </h2>
        <div className="flex gap-5 text-base-content-muted text-lg">
          <span>公開日</span>
          <LabelWithIcon Icon={() => <ClockArrowUp className="h-5 w-5" />}>
            <DateViewer date={article.publishedAt} />
          </LabelWithIcon>
        </div>
      </div>
      <Glass className="max-w-xl p-5">
        <p className="wrap-anywhere w-full break-keep text-xl">
          {article.description}
        </p>
      </Glass>
    </div>
  )
}

export default ArticleOverview

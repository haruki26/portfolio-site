import { ClockArrowUp } from 'lucide-react'
import Glass from '@/components/ui/Glass'
import NoImage from '@/components/ui/NoImage'
import type { ArticleOverview as _ArticleOverview } from '../../shared/types'

interface Props {
  article: Omit<_ArticleOverview, 'id'>
}

const ArticleOverview: React.FC<Props> = ({ article }) => {
  return (
    <article>
      <Glass className="flex flex-col gap-3 p-5">
        <div className="flex max-h-full min-h-36 w-full items-center justify-center rounded-xl bg-slate-300/80 backdrop-blur-3xl">
          {article.thumbnail ? (
            <img
              src={article.thumbnail.src}
              alt={article.thumbnail.alt ?? `${article.title}サムネイル`}
              width={article.thumbnail.width}
              height={article.thumbnail.height}
              className="h-full w-full"
            />
          ) : (
            <NoImage />
          )}
        </div>
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-xl">{article.title}</h2>
          <p className="text px-2">{article.description}</p>
          <div className="flex flex-row items-center gap-2 text-base-content-muted">
            <ClockArrowUp className="h-5 w-5" />
            <div className="flex flex-row gap-0.5 text-lg">
              <span>{article.publishedAt.getFullYear()}</span>
              <span>&#45;</span>
              <span>{article.publishedAt.getMonth() + 1}</span>
              <span>&#45;</span>
              <span>{article.publishedAt.getDate()}</span>
            </div>
          </div>
        </div>
      </Glass>
    </article>
  )
}

export default ArticleOverview

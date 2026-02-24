import { Link } from '@tanstack/react-router'
import { ClockArrowUp } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import DateViewer from '@/components/ui/DateViewer'
import Glass from '@/components/ui/Glass'
import NoImage from '@/components/ui/NoImage'
import { cn } from '@/libs/cn'
import type { Page } from '@/types'
import type { ArticleOverview } from '../../shared/types'

interface Props {
  articleType: Extract<Page, 'work' | 'blog'>
  articles: ArticleOverview[]
  className?: string
}

const ArticleCards: React.FC<Props> = ({
  articleType,
  articles,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid w-fit grid-cols-1 items-center gap-7 px-3',
        className,
      )}
    >
      {articles.map((article) => (
        <Glass
          key={article.id}
          className="col-span-1 row-span-4 grid w-xs xs:w-fit xs:max-w-sm grid-cols-1 grid-rows-subgrid gap-2"
        >
          <Link
            to={articleType === 'work' ? '/works/$id' : '/blogs/$id'}
            params={{ id: article.id }}
            className="row-span-4 grid grid-rows-subgrid"
          >
            <div className="flex max-h-full min-h-36 w-full items-center justify-center overflow-clip rounded-xl bg-slate-300/80 backdrop-blur-3xl">
              {article.thumbnail ? (
                <img
                  src={article.thumbnail.src}
                  alt={article.thumbnail.alt ?? `${article.title}サムネイル`}
                  width={article.thumbnail.width}
                  height={article.thumbnail.height}
                  className="size-full object-cover"
                />
              ) : (
                <NoImage />
              )}
            </div>
            <h2 className="font-bold text-2xl">{article.title}</h2>
            <p className="text px-2">{article.description}</p>
            <LabelWithIcon
              Icon={() => <ClockArrowUp className="h-5 w-5" />}
              className="text-base-content-muted"
            >
              <DateViewer date={article.publishedAt} />
            </LabelWithIcon>
          </Link>
        </Glass>
      ))}
    </div>
  )
}

export default ArticleCards

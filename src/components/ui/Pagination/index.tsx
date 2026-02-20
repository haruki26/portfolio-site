import { useMemo } from 'react'
import { cn } from '@/libs/cn'
import Glass from '../Glass'

const GlassLink: React.FC<{
  label: string
  isSelected?: boolean
  disable?: boolean
}> = ({ label, isSelected, disable = false }) => {
  return (
    <Glass
      className={cn(
        'w-fit rounded-xl px-3 py-1.5 text-lg',
        isSelected && 'text-xl',
        disable && 'bg-surface/10 text-base-content-muted',
      )}
    >
      <span>{label}</span>
    </Glass>
  )
}

const PAGINATION_ITEM_ID_PREFIX = 'pagination-item'

interface Props {
  pageLimit: number
  totalCount: number
  currentPage: number
  LinkComponent: React.ElementType<{ navTo: number; children: React.ReactNode }>
  className?: string
}

const Pagination: React.FC<Props> = ({
  pageLimit,
  totalCount,
  currentPage,
  LinkComponent,
  className,
}) => {
  const pageNums = useMemo(
    () =>
      Array.from({ length: Math.ceil(totalCount / pageLimit) }, (_, i) => ({
        id: `${PAGINATION_ITEM_ID_PREFIX}-${i}`,
        num: i + 1,
      })),
    [totalCount, pageLimit],
  )

  if (pageNums.length === 0) return

  return (
    <nav
      className={cn(
        'flex flex-row items-center justify-between gap-3',
        className,
      )}
    >
      {currentPage <= 1 ? (
        <GlassLink label="prev" disable />
      ) : (
        <LinkComponent navTo={currentPage - 1}>
          <GlassLink label="prev" />
        </LinkComponent>
      )}
      <ul className="flex w-fit flex-row items-center justify-center gap-5">
        {pageNums.map(({ id, num }) => (
          <li key={id}>
            {num === currentPage ? (
              <GlassLink label={num.toString()} />
            ) : (
              <LinkComponent navTo={num}>
                <span>{num}</span>
              </LinkComponent>
            )}
          </li>
        ))}
      </ul>
      {currentPage >= pageNums.length ? (
        <GlassLink label="next" disable />
      ) : (
        <LinkComponent navTo={currentPage + 1}>
          <GlassLink label="next" />
        </LinkComponent>
      )}
    </nav>
  )
}

export default Pagination

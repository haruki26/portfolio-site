import {
  articleDetailMapper,
  articleOverviewMapper,
} from '@/cms/shared/mapper/article'
import type { ArticleOverviewKeys } from '@/cms/shared/type'
import type { Work } from '@/features/article/work/types'
import type { Works } from '@/libs/microcms/type'

const workOverviewMapper = (
  work: Pick<Works, ArticleOverviewKeys>,
): Pick<Work, ArticleOverviewKeys> => articleOverviewMapper(work)

const workDetailMapper = (work: Works): Work => articleDetailMapper(work)

export { workDetailMapper, workOverviewMapper }

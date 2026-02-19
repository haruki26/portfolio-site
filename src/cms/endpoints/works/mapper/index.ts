import {
  publishedAtMapper,
  tagMapper,
  thumbnailMapper,
} from '@/cms/shared/mapper'
import { dateMapper } from '@/cms/shared/mapper/field'
import type { Work } from '@/features/work/types'
import type { Works } from '@/lib/microcms/type'

type OverviewKeys =
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'publishedAt'
  | 'tags'

const commonMapper = (
  target: Pick<Works, 'id' | 'thumbnail' | 'publishedAt' | 'tags'>,
) => ({
  thumbnail: thumbnailMapper(target.thumbnail),
  publishedAt: publishedAtMapper(target.publishedAt, target.id),
  tags: target.tags.map(tagMapper),
})

const workOverviewMapper = ({
  thumbnail,
  publishedAt,
  tags,
  ...rest
}: Pick<Works, OverviewKeys>): Pick<Work, OverviewKeys> => ({
  ...rest,
  ...commonMapper({ id: rest.id, thumbnail, publishedAt, tags }),
})

const workDetailMapper = ({
  id,
  title,
  description,
  body,
  thumbnail,
  publishedAt,
  updatedAt,
  tags,
}: Works): Work => ({
  id,
  title,
  description,
  body,
  ...commonMapper({ id, thumbnail, publishedAt, tags }),
  updatedAt: dateMapper(updatedAt),
})

export { workDetailMapper, workOverviewMapper }

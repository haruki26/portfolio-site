import { tagMapper } from '@/cms/shared/mapper'
import {
  publishedAtMapper,
  thumbnailMapper,
  updatedAtMapper,
} from '@/cms/shared/mapper/field'
import type { Works } from '@/lib/microcms/type'
import type { Work } from '../type'

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
  thumbnail,
  publishedAt,
  updatedAt,
  tags,
  ...rest
}: Works): Work => ({
  ...rest,
  ...commonMapper({ id: rest.id, thumbnail, publishedAt, tags }),
  updatedAt: updatedAtMapper(updatedAt),
})

export { workDetailMapper, workOverviewMapper }

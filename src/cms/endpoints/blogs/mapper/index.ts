import { tagMapper } from '@/cms/shared/mapper'
import {
  publishedAtMapper,
  thumbnailMapper,
  updatedAtMapper,
} from '@/cms/shared/mapper/field'
import type { Blogs } from '@/lib/microcms/type'
import type { Blog } from '../type'

type OverviewKeys =
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'publishedAt'
  | 'tags'

const commonMapper = (
  target: Pick<Blogs, 'id' | 'thumbnail' | 'publishedAt' | 'tags'>,
) => ({
  thumbnail: thumbnailMapper(target.thumbnail),
  publishedAt: publishedAtMapper(target.publishedAt, target.id),
  tags: target.tags.map(tagMapper),
})

const blogOverviewMapper = ({
  thumbnail,
  publishedAt,
  tags,
  ...rest
}: Pick<Blogs, OverviewKeys>): Pick<Blog, OverviewKeys> => ({
  ...rest,
  ...commonMapper({ id: rest.id, thumbnail, publishedAt, tags }),
})

const blogDetailMapper = ({
  thumbnail,
  publishedAt,
  updatedAt,
  tags,
  ...rest
}: Blogs): Blog => ({
  ...rest,
  ...commonMapper({ id: rest.id, thumbnail, publishedAt, tags }),
  updatedAt: updatedAtMapper(updatedAt),
})

export { blogDetailMapper, blogOverviewMapper }

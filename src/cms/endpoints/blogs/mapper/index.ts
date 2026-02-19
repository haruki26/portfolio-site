import {
  publishedAtMapper,
  tagMapper,
  thumbnailMapper,
} from '@/cms/shared/mapper'
import { dateMapper } from '@/cms/shared/mapper/field'
import type { Blog } from '@/features/blog/types'
import type { Blogs } from '@/lib/microcms/type'

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
  id,
  title,
  description,
  body,
  thumbnail,
  publishedAt,
  updatedAt,
  tags,
}: Blogs): Blog => ({
  id,
  title,
  description,
  body,
  ...commonMapper({ id, thumbnail, publishedAt, tags }),
  updatedAt: dateMapper(updatedAt),
})

export { blogDetailMapper, blogOverviewMapper }

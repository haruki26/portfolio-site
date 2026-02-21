import {
  articleDetailMapper,
  articleOverviewMapper,
} from '@/cms/shared/mapper/article'
import type { ArticleOverviewKeys } from '@/cms/shared/type'
import type { Blog } from '@/features/article/blog/types'
import type { Blogs } from '@/libs/microcms/type'

const blogOverviewMapper = (
  blog: Pick<Blogs, ArticleOverviewKeys>,
): Pick<Blog, ArticleOverviewKeys> => articleOverviewMapper(blog)

const blogDetailMapper = (blog: Blogs): Blog => articleDetailMapper(blog)

export { blogDetailMapper, blogOverviewMapper }

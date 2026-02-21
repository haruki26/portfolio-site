import {
  publishedAtMapper,
  tagMapper,
  thumbnailMapper,
} from '@/cms/shared/mapper'
import { dateMapper } from '@/cms/shared/mapper/field'
import type { Article, ArticleOverview } from '@/features/article/shared/types'
import type { Articles } from '@/libs/microcms/type'
import type { ArticleOverviewKeys } from '../type'

const articleOverviewMapper = ({
  id,
  thumbnail,
  publishedAt,
  tags,
  ...rest
}: Pick<Articles, ArticleOverviewKeys>): ArticleOverview => ({
  id,
  title: rest.title,
  description: rest.description,
  thumbnail: thumbnailMapper(thumbnail),
  publishedAt: publishedAtMapper(publishedAt, id),
  tags: tags.map(tagMapper),
})

const articleDetailMapper = (article: Articles): Article => ({
  body: article.body,
  ...articleOverviewMapper(article),
  updatedAt: dateMapper(article.updatedAt),
})

export { articleDetailMapper, articleOverviewMapper }

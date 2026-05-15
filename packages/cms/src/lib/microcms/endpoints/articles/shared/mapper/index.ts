import { NotPublishedError } from '@/lib/microcms/shared/error'
import { dateMapper, imageMapper } from '@/lib/microcms/shared/mapper'
import type { Articles, Tags } from '@/lib/microcms/type'
import type {
  Article,
  ArticleOverview,
  ArticleOverviewKeys,
  Tag,
} from '@/schema'

const tagMapper = (tag: Pick<Tags, 'id' | 'name'>): Tag => ({
  ...tag,
})

const articleOverviewMapper = ({
  id,
  thumbnail,
  publishedAt,
  tags,
  ...rest
}: Pick<Articles, ArticleOverviewKeys>): ArticleOverview<Article> => {
  const publishedAt_ = dateMapper(publishedAt)
  if (publishedAt_ === null) {
    throw new NotPublishedError(id)
  }

  return {
    id,
    title: rest.title,
    description: rest.description,
    thumbnail: thumbnail !== undefined ? imageMapper(thumbnail) : undefined,
    publishedAt: publishedAt_,
    tags: tags.map(tagMapper),
  }
}

const articleDetailMapper = (article: Articles): Article => ({
  body: article.body,
  ...articleOverviewMapper(article),
  updatedAt: dateMapper(article.updatedAt),
})

export { articleDetailMapper, articleOverviewMapper }

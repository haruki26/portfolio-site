import type z from 'zod'
import type { getArticleListSchema } from './schemas'

interface Image {
  src: string
  alt?: string
  width?: number
  height?: number
}

interface Tag {
  id: string
  name: string
}

interface Article {
  id: string
  title: string
  description: string
  body: string
  thumbnail?: Image
  publishedAt: Date
  updatedAt: Date
  tags: Tag[]
}

type ArticleOverview = Pick<
  Article,
  'id' | 'title' | 'description' | 'thumbnail' | 'publishedAt' | 'tags'
>

type GetArticleListQuery = z.infer<typeof getArticleListSchema>

export type { Image, Article, Tag, GetArticleListQuery, ArticleOverview }

import type { ARTICLE_OVERVIEW_KEYS } from './constant'

interface CMSImage {
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
  thumbnail?: CMSImage
  publishedAt: Date
  updatedAt: Date
  tags: Tag[]
}

type ArticleOverviewKeys = (typeof ARTICLE_OVERVIEW_KEYS)[number]
type ArticleOverview<TArticle extends Article> = Pick<
  TArticle,
  ArticleOverviewKeys
>

interface Blog extends Article {}

interface Work extends Article {}

interface Certification {
  name: string
  date: Date
}

interface Hobby {
  name: string
  description: string
  images: CMSImage[]
}

export type {
  CMSImage,
  Tag,
  Article,
  ArticleOverviewKeys,
  ArticleOverview,
  Blog,
  Work,
  Certification,
  Hobby,
}

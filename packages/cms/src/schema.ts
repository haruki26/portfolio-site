import type { ARTICLE_OVERVIEW_KEYS } from './constant'

interface CMSImage {
  src: string
  alt?: string
  width?: number
  height?: number
}

interface Tag {
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
type BlogOverview = ArticleOverview<Blog>

interface Work extends Article {}
type WorkOverview = ArticleOverview<Work>

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
  BlogOverview,
  Work,
  WorkOverview,
  Certification,
  Hobby,
}

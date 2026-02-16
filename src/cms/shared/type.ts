interface Image {
  src: string
  alt?: string
}

interface Tag {
  id: string
  name: string
}

interface BaseArticle {
  id: string
  title: string
  description: string
  body: string
  thumbnail?: Image
  publishedAt: Date
  updatedAt: Date
  tags: Tag[]
}

type ListFilter =
  | {
      currentPage?: undefined
      limit?: number
    }
  | {
      currentPage: number
      limit: number
    }

export type { BaseArticle, Tag, ListFilter, Image }

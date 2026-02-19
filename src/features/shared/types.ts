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

export type { Image, Article, Tag }

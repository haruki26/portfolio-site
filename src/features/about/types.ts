import type { Image } from '../article/shared/types'

interface Certification {
  name: string
  date: Date
}

interface Hobby {
  name: string
  description: string
  images: Image[]
}

export type { Certification, Hobby }

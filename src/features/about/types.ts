import type { Image } from '../shared/types'

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

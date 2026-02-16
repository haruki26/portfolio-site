import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'
import { toDate } from '@/lib/microcms/date'
import { NotPublishedError } from '../error'
import type { Image } from '../type'

const thumbnailMapper = (
  thumbnail: MicroCMSImage | undefined,
): Image | undefined =>
  thumbnail !== undefined
    ? {
      src: thumbnail.url,
      alt: thumbnail.alt,
    }
    : undefined

const updatedAtMapper = (updatedAt: MicroCMSDate['updatedAt']): Date =>
  toDate(updatedAt)

const publishedAtMapper = (
  publishedAt: MicroCMSDate['publishedAt'],
  id: string,
): Date => {
  if (publishedAt === undefined) {
    throw new NotPublishedError(id)
  }
  return toDate(publishedAt)
}

export { publishedAtMapper, thumbnailMapper, updatedAtMapper }

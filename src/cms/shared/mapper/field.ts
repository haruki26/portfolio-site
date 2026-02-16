import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'
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
  new Date(updatedAt)

const publishedAtMapper = (
  publishedAt: MicroCMSDate['publishedAt'],
  id: string,
): Date => {
  if (publishedAt === undefined) {
    throw new NotPublishedError(id)
  }
  return new Date(publishedAt)
}

export { publishedAtMapper, thumbnailMapper, updatedAtMapper }

import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'
import type { Tags } from '@/lib/microcms/type'
import { NotPublishedError } from '../error'
import type { Image, Tag } from '../type'
import { dateMapper, imageMapper } from './field'

const thumbnailMapper = (
  thumbnail: MicroCMSImage | undefined,
): Image | undefined =>
  thumbnail !== undefined ? imageMapper(thumbnail) : undefined

const updatedAtMapper = (updatedAt: MicroCMSDate['updatedAt']): Date =>
  dateMapper(updatedAt)

const publishedAtMapper = (
  publishedAt: MicroCMSDate['publishedAt'],
  id: string,
): Date => {
  if (publishedAt === undefined) {
    throw new NotPublishedError(id)
  }
  return dateMapper(publishedAt)
}

const tagMapper = (tag: Pick<Tags, 'id' | 'name'>): Tag => ({
  ...tag,
})

export { tagMapper, publishedAtMapper, thumbnailMapper, updatedAtMapper }

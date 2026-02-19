import type { MicroCMSImage } from 'microcms-js-sdk'
import type { Image } from '@/features/shared/types'

const imageMapper = ({ url, ...rest }: MicroCMSImage): Image => ({
  ...rest,
  src: url,
})

const dateMapper = (date: string): Date => new Date(date)

export { imageMapper, dateMapper }

import type { MicroCMSImage } from 'microcms-js-sdk'
import type { CMSImage } from '@/schema'

const imageMapper = ({ url, ...rest }: MicroCMSImage): CMSImage => ({
  ...rest,
  src: url,
})

function dateMapper(date: string): Date
function dateMapper(date: string | undefined): Date | null
function dateMapper(date: string | undefined): Date | null {
  return date === undefined ? null : new Date(date)
}

export { dateMapper, imageMapper }

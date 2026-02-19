import { imageMapper } from '@/cms/shared/mapper/field'
import type { Hobbies } from '@/lib/microcms/type'
import type { Hobby } from '../type'

const hobbyMapper = ({ images, ...rest }: Hobbies): Hobby => ({
  ...rest,
  images: images.map(imageMapper),
})

export { hobbyMapper }

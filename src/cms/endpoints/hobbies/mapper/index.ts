import { imageMapper } from '@/cms/shared/mapper/field'
import type { Hobby } from '@/features/about/types'
import type { Hobbies } from '@/lib/microcms/type'

const hobbyMapper = ({ name, description, images }: Hobbies): Hobby => ({
  name,
  description,
  images: images.map(imageMapper),
})

export { hobbyMapper }

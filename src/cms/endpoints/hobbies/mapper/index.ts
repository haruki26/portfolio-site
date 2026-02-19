import { imageMapper } from '@/cms/shared/mapper/field'
import type { Hobbies } from '@/lib/microcms/type'
import type { Hobby } from '../type'

const hobbyMapper = ({ name, description, images }: Hobbies): Hobby => ({
  name,
  description,
  images: images.map(imageMapper),
})

export { hobbyMapper }

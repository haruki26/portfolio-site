import type { Tags } from '@/lib/microcms/type'
import type { Tag } from '../type'

const tagMapper = (tag: Pick<Tags, 'id' | 'name'>): Tag => ({
  ...tag,
})

export { tagMapper }

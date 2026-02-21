import { dateMapper } from '@/cms/shared/mapper/field'
import type { Certification } from '@/features/about/types'
import type { Certifications } from '@/libs/microcms/type'

const certificationMapper = (obj: Certifications): Certification => ({
  name: obj.name,
  date: dateMapper(obj.date),
})

export { certificationMapper }

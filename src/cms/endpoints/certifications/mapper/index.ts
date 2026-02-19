import { dateMapper } from '@/cms/shared/mapper/field'
import type { Certifications } from '@/lib/microcms/type'
import type { Certification } from '../type'

const certificationMapper = (obj: Certifications): Certification => ({
  name: obj.name,
  date: dateMapper(obj.date),
})

export { certificationMapper }

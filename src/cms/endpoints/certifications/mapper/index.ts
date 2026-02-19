import { toDate } from '@/lib/microcms/date'
import type { Certifications } from '@/lib/microcms/type'
import type { Certification } from '../type'

const certificationMapper = (obj: Certifications): Certification => ({
  name: obj.name,
  date: toDate(obj.date),
})

export { certificationMapper }

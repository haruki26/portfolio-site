import { queryOptions } from '@tanstack/react-query'
import { createQueryError } from '@/features/shared/createQueryError'
import { getCertifications, getHobbies } from '../functions'
import { aboutKeys } from './key'

const getCertificationsOptions = () =>
  queryOptions({
    queryKey: aboutKeys.certifications(),
    queryFn: async () => {
      const result = await getCertifications()

      if (result.resultType === 'fail') {
        throw createQueryError(result.error)
      }
      return result.value.contents
    },
  })

const getHobbiesOptions = () =>
  queryOptions({
    queryKey: aboutKeys.hobbies(),
    queryFn: async () => {
      const result = await getHobbies()

      if (result.resultType === 'fail') {
        throw createQueryError(result.error)
      }
      return result.value.contents
    },
  })

export { getCertificationsOptions, getHobbiesOptions }

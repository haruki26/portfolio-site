import { queryOptions } from '@tanstack/react-query'
import type { GetArticleListQuery } from '@/features/article/shared/types'
import { createQueryError } from '@/features/shared/createQueryError'
import { getWork, getWorks } from '../functions/index.server'
import { worksKeys } from './key'

const getWorksOptions = (query?: GetArticleListQuery) =>
  queryOptions({
    queryKey: worksKeys.list(query),
    queryFn: async () => {
      const result = await getWorks({ data: query })

      if (result.type === 'Failure') {
        throw createQueryError(result.error)
      }
      return result.value
    },
  })

const getWorkOptions = (id: string) =>
  queryOptions({
    queryKey: worksKeys.detail(id),
    queryFn: async () => {
      const result = await getWork({ data: { id } })

      if (result.type === 'Failure') {
        throw createQueryError(result.error)
      }
      return result.value
    },
  })

export { getWorksOptions, getWorkOptions }

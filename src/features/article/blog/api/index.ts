import { queryOptions } from '@tanstack/react-query'
import type { GetArticleListQuery } from '@/features/article/shared/types'
import { createQueryError } from '@/features/shared/createQueryError'
import { ARTICLE_STALE_TIME } from '../../shared/config'
import { getBlog, getBlogs } from '../functions/index.server'
import { blogsKeys } from './key'

const getBlogsOptions = (query?: GetArticleListQuery) =>
  queryOptions({
    queryKey: blogsKeys.list(query),
    queryFn: async () => {
      const result = await getBlogs({ data: query })

      if (result.type === 'Failure') {
        throw createQueryError(result.error)
      }
      return result.value
    },
    staleTime: ARTICLE_STALE_TIME,
  })

const getBlogOptions = (id: string) =>
  queryOptions({
    queryKey: blogsKeys.detail(id),
    queryFn: async () => {
      const result = await getBlog({ data: { id } })

      if (result.type === 'Failure') {
        throw createQueryError(result.error)
      }
      return result.value
    },
    staleTime: ARTICLE_STALE_TIME,
  })

export { getBlogsOptions, getBlogOptions }

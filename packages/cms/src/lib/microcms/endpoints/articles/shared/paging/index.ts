import type { PagingOptions } from '@/type'

export const calcPaging = (options?: PagingOptions) => ({
  limit: options?.limit,
  offset:
    options?.currentPage !== undefined
      ? options.limit * (options.currentPage - 1)
      : undefined,
})

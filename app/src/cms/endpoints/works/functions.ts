import type { GetArticleListQuery } from '@/features/article/shared/types'
import { createClient } from '@/libs/microcms'

const fetchWorksOverview = async (options?: GetArticleListQuery) => {
  const client = createClient()
  return await client.getList({
    endpoint: 'works',
    queries: {
      fields: [
        'id',
        'title',
        'description',
        'thumbnail',
        'publishedAt',
        'tags',
      ],
      limit: options?.limit,
      offset:
        options?.currentPage !== undefined
          ? options.limit * (options.currentPage - 1)
          : undefined,
    },
  })
}

const fetchWorkDetail = async (id: string) => {
  const client = createClient()
  return await client.getListDetail({
    endpoint: 'works',
    contentId: id,
  })
}

export { fetchWorkDetail, fetchWorksOverview }

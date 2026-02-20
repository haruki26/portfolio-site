import type { GetArticleListQuery } from '@/features/shared/types'
import { createClient } from '@/libs/microcms'

const fetchBlogsOverview = async (options?: GetArticleListQuery) => {
  const client = createClient()
  return await client.getList({
    endpoint: 'blogs',
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

const fetchBlogDetail = async (id: string) => {
  const client = createClient()
  return await client.getListDetail({
    endpoint: 'blogs',
    contentId: id,
  })
}

export { fetchBlogDetail, fetchBlogsOverview }

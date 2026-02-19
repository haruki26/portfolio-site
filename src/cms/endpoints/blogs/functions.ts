import type { ListFilter } from '@/cms/shared/type'
import { createClient } from '@/lib/microcms'

const fetchBlogsOverview = async (options?: ListFilter) => {
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
          ? options.limit * (1 - options.currentPage)
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

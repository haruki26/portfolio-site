import type { GetArticleListQuery } from '@/features/article/shared/types'
import { tryAsync } from '@/libs/result'
import { fetchBlogDetail, fetchBlogsOverview } from './functions'
import { blogDetailMapper, blogOverviewMapper } from './mapper'

const getBlogList = (options?: GetArticleListQuery) =>
  tryAsync(async () => {
    const res = await fetchBlogsOverview(options)
    return {
      blogs: res.contents.map(blogOverviewMapper),
      totalCount: res.totalCount,
    }
  })

const getBlogDetail = (id: string) =>
  tryAsync(async () => {
    const res = await fetchBlogDetail(id)
    return blogDetailMapper(res)
  })

export { getBlogList, getBlogDetail }

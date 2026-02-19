import type { ListFilter } from '@/cms/shared/type'
import { tryAsync } from '@/lib/result'
import { fetchBlogDetail, fetchBlogsOverview } from './functions'
import { blogDetailMapper, blogOverviewMapper } from './mapper'

const getBlogList = (options?: ListFilter) =>
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

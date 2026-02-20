import type { GetArticleListQuery } from '@/features/shared/types'
import { tryAsync } from '@/libs/result'
import { fetchWorkDetail, fetchWorksOverview } from './functions'
import { workDetailMapper, workOverviewMapper } from './mapper'

const getWorkList = (options?: GetArticleListQuery) =>
  tryAsync(async () => {
    const res = await fetchWorksOverview(options)
    return {
      works: res.contents.map(workOverviewMapper),
      totalCount: res.totalCount,
    }
  })

const getWorkDetail = (id: string) =>
  tryAsync(async () => {
    const res = await fetchWorkDetail(id)
    return workDetailMapper(res)
  })

export { getWorkList, getWorkDetail }

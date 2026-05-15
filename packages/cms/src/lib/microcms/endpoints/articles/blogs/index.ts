import { ARTICLE_OVERVIEW_KEYS } from '@/constant'
import type { GetMicroCMSClient } from '@/lib/microcms/shared/type'
import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Blog } from '@/schema'
import { articleDetailMapper, articleOverviewMapper } from '../shared/mappper'
import { calcPaging } from '../shared/paging'

export const createBlogsEndpoint = (getClient: GetMicroCMSClient) =>
  createEndpointBuilder(getClient)
    .addGetListFn<Blog>((client) => async (options) => {
      const res = await client.getList({
        endpoint: 'blogs',
        queries: {
          fields: ARTICLE_OVERVIEW_KEYS,
          ...calcPaging(options),
        },
      })

      return res.contents.map(articleOverviewMapper)
    })
    .addGetDetailFn<Blog>((client) => async (id) => {
      const res = await (async () => {
        try {
          return await client.getListDetail({
            endpoint: 'blogs',
            contentId: id,
          })
        } catch (error) {
          if (error instanceof Error) {
            return null
          }
          throw error
        }
      })()

      return res === null ? null : articleDetailMapper(res)
    })
    .build()

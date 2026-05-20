import { ARTICLE_OVERVIEW_KEYS } from '@/constant'
import type { GetMicroCMSClient } from '@/lib/microcms/shared/type'
import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Work } from '@/schema'
import { articleDetailMapper, articleOverviewMapper } from '../shared/mapper'
import { calcPaging } from '../shared/paging'

export const createWorksEndpoint = (getClient: GetMicroCMSClient) =>
  createEndpointBuilder(getClient)
    .addGetListFn<Work>((client) => async (options) => {
      const res = await client.getList({
        endpoint: 'works',
        queries: {
          fields: ARTICLE_OVERVIEW_KEYS,
          ...calcPaging(options),
        },
      })

      return {
        contents: res.contents.map(articleOverviewMapper),
        totalCount: res.totalCount,
      }
    })
    .addGetDetailFn<Work>((client) => async (id) => {
      const res = await (async () => {
        try {
          return await client.getListDetail({
            endpoint: 'works',
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

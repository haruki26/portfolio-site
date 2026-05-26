import type { CMSClient } from '@repo/cms'
import { createServerOnlyFn } from '@tanstack/react-start'
import type { GetWorkListOptions } from '@/features/article/work/types'

const getWorks = createServerOnlyFn(
  (client: CMSClient, ...params: GetWorkListOptions) =>
    client.articles.works.getList(...params),
)
const getWork = createServerOnlyFn((client: CMSClient, id: string) =>
  client.articles.works.getDetail(id),
)

export { getWorks, getWork }

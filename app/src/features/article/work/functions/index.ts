import { createServerFn } from '@tanstack/react-start'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '@/features/article/shared/schemas'
import { getCMSClientMiddleware } from '@/integrations/cms/client'
import { tryAsync } from '@/libs/result'
import { getWork as _getWork, getWorks as _getWorks } from './index.server'

const getWorks = createServerFn()
  .inputValidator(getArticleListSchema)
  .middleware([getCMSClientMiddleware])
  .handler(async ({ data, context: { getCMSClient } }) =>
    tryAsync(async () => _getWorks(getCMSClient(), data)),
  )

const getWork = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .middleware([getCMSClientMiddleware])
  .handler(async ({ data, context: { getCMSClient } }) =>
    tryAsync(async () => _getWork(getCMSClient(), data.id)),
  )

export { getWorks, getWork }

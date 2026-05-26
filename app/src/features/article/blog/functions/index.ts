import { createServerFn } from '@tanstack/react-start'
import { getCMSClientMiddleware } from '@/integrations/cms/client'
import { tryAsync } from '@/libs/result'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '../../shared/schemas'
import { getBlog as _getBlog, getBlogs as _getBlogs } from './index.server'

const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)
  .middleware([getCMSClientMiddleware])
  .handler(async ({ data, context: { getCMSClient } }) =>
    tryAsync(async () => _getBlogs(getCMSClient(), data)),
  )

const getBlog = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .middleware([getCMSClientMiddleware])
  .handler(async ({ data, context: { getCMSClient } }) =>
    tryAsync(async () => _getBlog(getCMSClient(), data.id)),
  )

export { getBlog, getBlogs }

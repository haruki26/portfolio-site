import { createServerFn } from '@tanstack/react-start'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '../../shared/schemas'
import { getBlog as _getBlog, getBlogs as _getBlogs } from './index.server'
import { tryAsync } from '@/libs/result'

const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => tryAsync(async () => await _getBlogs(data)
  ))

const getBlog = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .handler(async ({ data }) => tryAsync(async () => _getBlog(data.id)))

export { getBlog, getBlogs }

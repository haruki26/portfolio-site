import { createServerFn } from '@tanstack/react-start'
import { tryAsync } from '@/libs/result'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '../../shared/schemas'
import { getBlog as _getBlog, getBlogs as _getBlogs } from './index.server'

const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => tryAsync(async () => await _getBlogs(data)))

const getBlog = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .handler(async ({ data }) => tryAsync(async () => _getBlog(data.id)))

export { getBlog, getBlogs }

import { createServerFn } from '@tanstack/react-start'
import { toSerializableResult } from '@/libs/result'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '../../shared/schemas'
import { getBlog as _getBlog, getBlogs as _getBlogs } from './index.server'

const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => toSerializableResult(await _getBlogs(data)))

const getBlog = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .handler(async ({ data }) => toSerializableResult(await _getBlog(data.id)))

export { getBlog, getBlogs }

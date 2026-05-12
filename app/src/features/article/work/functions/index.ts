import { createServerFn } from '@tanstack/react-start'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '@/features/article/shared/schemas'
import { toSerializableResult } from '@/libs/result'
import { getWork as _getWork, getWorks as _getWorks } from './index.server'

const getWorks = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => toSerializableResult(await _getWorks(data)))

const getWork = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .handler(async ({ data }) => toSerializableResult(await _getWork(data.id)))

export { getWorks, getWork }

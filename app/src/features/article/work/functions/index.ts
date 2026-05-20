import { createServerFn } from '@tanstack/react-start'
import {
  getArticleDetailSchema,
  getArticleListSchema,
} from '@/features/article/shared/schemas'
import { tryAsync } from '@/libs/result'
import { getWork as _getWork, getWorks as _getWorks } from './index.server'

const getWorks = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => tryAsync(async () => _getWorks(data)))

const getWork = createServerFn()
  .inputValidator(getArticleDetailSchema)
  .handler(async ({ data }) => tryAsync(async () => _getWork(data.id)))

export { getWorks, getWork }

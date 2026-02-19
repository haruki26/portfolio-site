import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import z from 'zod'
import { getWorkDetail, getWorkList } from '@/cms/endpoints/works'
import { getArticleListSchema } from '@/features/shared/schemas'
import { toSerializableResult } from '@/lib/result'

const _getWorks = createServerOnlyFn(getWorkList)
const getWorks = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => toSerializableResult(await _getWorks(data)))

const getWorkDetailSchema = z.object({
  id: z.string(),
})

const _getWork = createServerOnlyFn(getWorkDetail)
const getWork = createServerFn()
  .inputValidator(getWorkDetailSchema)
  .handler(async ({ data }) => toSerializableResult(await _getWork(data.id)))

export { getWorks, getWork }

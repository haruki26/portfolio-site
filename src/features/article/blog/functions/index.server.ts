import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import z from 'zod'
import { getBlogDetail, getBlogList } from '@/cms/endpoints/blogs'
import { getArticleListSchema } from '@/features/article/shared/schemas'
import { toSerializableResult } from '@/libs/result'

const _getBlogs = createServerOnlyFn(getBlogList)
const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)
  .handler(async ({ data }) => toSerializableResult(await _getBlogs(data)))

const getBlogDetailSchema = z.object({
  id: z.string(),
})

const _getBlog = createServerOnlyFn(getBlogDetail)
const getBlog = createServerFn()
  .inputValidator(getBlogDetailSchema)
  .handler(async ({ data }) => toSerializableResult(await _getBlog(data.id)))

export { getBlogs, getBlog }

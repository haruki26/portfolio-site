import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { getBlogsOptions } from '@/features/article/blog/api'

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
})

export const Route = createFileRoute('/blogs/')({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ ...search }),
  beforeLoad: async ({ context: { queryClient }, search: { page } }) => {
    const { totalCount } = await queryClient.ensureQueryData(
      getBlogsOptions({
        limit: LIST_ARTICLES_NUM,
        currentPage: page,
      }),
    )
    if (totalCount === 0) return

    const maxPage = Math.ceil(totalCount / LIST_ARTICLES_NUM)

    if (maxPage < page) {
      throw redirect({
        to: '.',
        search: {
          page: maxPage,
        },
      })
    }
  },
  loader: async ({ context: { queryClient }, deps: { page } }) => {
    await queryClient.ensureQueryData(
      getBlogsOptions({
        limit: LIST_ARTICLES_NUM,
        currentPage: page,
      }),
    )
  },
})

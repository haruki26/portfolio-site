import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { getWorksOptions } from '@/features/article/work/api'

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
})

export const Route = createFileRoute('/works/')({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ ...search }),
  beforeLoad: async ({ context: { queryClient }, search: { page } }) => {
    const { totalCount } = await queryClient.ensureQueryData(
      getWorksOptions({
        limit: LIST_ARTICLES_NUM,
        currentPage: page,
      }),
    )
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
    const { totalCount } = await queryClient.ensureQueryData(
      getWorksOptions({
        limit: LIST_ARTICLES_NUM,
        currentPage: page,
      }),
    )
    return { totalCount }
  },
})

import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { MY_INFO } from '@/configs/myInfo'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getBlogsOptions } from '@/features/article/blog/api'
import { createCollectionJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

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

    return { page }
  },
  head: ({ loaderData }) =>
    generateHead({
      title: `ブログ一覧 | ${SEO.title}`,
      description: 'ブログの一覧ページです。',
      url: `${SEO.url}/blogs?page=${loaderData?.page ?? 1}`,
      image: MY_INFO.iconImage,
      type: 'website',
      jsonLD: createCollectionJsonLD({
        name: 'ブログ一覧',
        url: `${SEO.url}/blogs?page=${loaderData?.page ?? 1}`,
      }),
    }),
})

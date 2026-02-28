import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { MY_INFO } from '@/configs/myInfo'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getWorksOptions } from '@/features/article/work/api'
import { generateHead } from '@/libs/generateHead'

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
    const { works } = await queryClient.ensureQueryData(
      getWorksOptions({
        limit: LIST_ARTICLES_NUM,
        currentPage: page,
      }),
    )

    return { page, tags: works.flatMap((w) => w.tags) }
  },
  head: ({ loaderData }) =>
    generateHead({
      title: `成果物一覧 | ${SEO.title}`,
      description: `成果物に関する記事の一覧ページです。${loaderData !== undefined ? `${loaderData.tags.map((tag) => tag.name).join('、')}などに関連する記事があります。` : ''}`,
      url: `${SEO.url}/works?page=${loaderData?.page ?? 1}`,
      image: MY_INFO.iconImage,
      type: 'website',
    }),
})

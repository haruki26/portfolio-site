import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { MY_INFO } from '@/configs/myInfo'
import { LIST_ARTICLES_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getBlogs } from '@/features/article/blog/functions'
import { createCollectionJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

const searchParamsSchema = z.object({
  page: z.number().min(1).default(1).catch(1),
})

export const Route = createFileRoute('/blogs/')({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ ...search }),
  beforeLoad: async ({ search: { page } }) => {
    const result = await getBlogs({
      data: { limit: LIST_ARTICLES_NUM, currentPage: page },
    })
    if (result.resultType === 'fail') {
      throw new Error(result.error.message)
    }
    const { totalCount, contents } = result.value
    const maxPage = Math.ceil(totalCount / LIST_ARTICLES_NUM)

    if (maxPage < page) {
      throw redirect({
        to: '.',
        search: {
          page: maxPage,
        },
      })
    }

    return { totalCount, contents }
  },
  loader: async ({ context: { totalCount, contents }, deps: { page } }) => ({
    page,
    totalCount,
    blogs: contents,
  }),
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

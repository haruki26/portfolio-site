import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { getWorkOptions } from '@/features/article/work/api'
import { createArticleJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/works/$id/')({
  loader: async ({ context: { queryClient }, params }) => {
    return await queryClient.ensureQueryData(getWorkOptions(params.id))
  },
  head: ({ loaderData, params }) =>
    loaderData !== undefined
      ? generateHead({
          title: `${loaderData.title} | ${SEO.title}`,
          description: loaderData.description,
          image: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
          url: `${SEO.url}/works/${params.id}`,
          type: 'article',
          jsonLD: createArticleJsonLD({
            title: loaderData.title,
            thumbnailSrc: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
            publishedAt: loaderData.publishedAt,
            authorName: `${MY_INFO.lastName}${MY_INFO.firstName}`,
          }),
        })
      : {},
})

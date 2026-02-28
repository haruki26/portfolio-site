import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { getWorkOptions } from '@/features/article/work/api'
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
        })
      : generateHead({
          title: SEO.title,
          description: SEO.description,
          image: MY_INFO.iconImage,
          url: `${SEO.url}/works/${params.id}`,
        }),
})

import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { getBlogOptions } from '@/features/article/blog/api'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/blogs/$id/')({
  loader: async ({ context: { queryClient }, params }) => {
    return await queryClient.ensureQueryData(getBlogOptions(params.id))
  },
  head: ({ loaderData, params }) =>
    loaderData !== undefined
      ? generateHead({
          title: `${loaderData.title} | ${SEO.title}`,
          description: loaderData.description,
          image: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
          url: `${SEO.url}/blogs/${params.id}`,
          type: 'article',
        })
      : generateHead({
          title: SEO.title,
          description: SEO.description,
          image: MY_INFO.iconImage,
          url: `${SEO.url}/blogs/${params.id}`,
          type: 'article',
        }),
})

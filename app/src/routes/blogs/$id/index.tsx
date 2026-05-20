import { createFileRoute, notFound } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import { getBlogOptions } from '@/features/article/blog/api'
import { createArticleJsonLD } from '@/libs/createJsonLD'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/blogs/$id/')({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.ensureQueryData(getBlogOptions(params.id))

    if (data === null) {
      throw notFound()
    }

    return data
  },
  head: ({ loaderData, params }) =>
    loaderData !== undefined
      ? generateHead({
        title: `${loaderData.title} | ${SEO.title}`,
        description: loaderData.description,
        image: loaderData.thumbnail?.src ?? MY_INFO.iconImage,
        url: `${SEO.url}/blogs/${params.id}`,
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

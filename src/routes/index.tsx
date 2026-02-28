import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getBlogsOptions } from '@/features/article/blog/api'
import { getWorksOptions } from '@/features/article/work/api'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(getWorksOptions({ limit: TOP_ARTICLE_NUM })),
      queryClient.ensureQueryData(getBlogsOptions({ limit: TOP_ARTICLE_NUM })),
    ])
  },
  head: () =>
    generateHead({
      title: SEO.title,
      description: SEO.description,
      url: SEO.url,
      image: MY_INFO.iconImage,
    }),
})

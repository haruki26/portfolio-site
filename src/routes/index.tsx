import { createFileRoute } from '@tanstack/react-router'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { getBlogsOptions } from '@/features/article/blog/api'
import { getWorksOptions } from '@/features/article/work/api'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(
      getWorksOptions({ limit: TOP_ARTICLE_NUM }),
    )
    await queryClient.ensureQueryData(
      getBlogsOptions({ limit: TOP_ARTICLE_NUM }),
    )
  },
})

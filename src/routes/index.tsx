import { createFileRoute } from '@tanstack/react-router'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { getWorksOptions } from '@/features/article/work/api'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const works = await queryClient.ensureQueryData(
      getWorksOptions({ limit: TOP_ARTICLE_NUM }),
    )
    return {
      works: works.works,
    }
  },
})

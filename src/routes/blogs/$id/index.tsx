import { createFileRoute } from '@tanstack/react-router'
import { getBlogOptions } from '@/features/article/blog/api'

export const Route = createFileRoute('/blogs/$id/')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(getBlogOptions(params.id))
  },
})

import { createFileRoute } from '@tanstack/react-router'
import { getWorkOptions } from '@/features/article/work/api'

export const Route = createFileRoute('/works/$id/')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(getWorkOptions(params.id))
  },
})

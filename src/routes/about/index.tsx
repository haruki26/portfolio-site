import { createFileRoute } from '@tanstack/react-router'
import { getCerticationsOptions, getHobbiesOptions } from '@/features/about/api'

export const Route = createFileRoute('/about/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(getCerticationsOptions()),
      queryClient.ensureQueryData(getHobbiesOptions()),
    ])
  },
})

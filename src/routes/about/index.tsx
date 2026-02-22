import { createFileRoute } from '@tanstack/react-router'
import {
  getCertificationsOptions,
  getHobbiesOptions,
} from '@/features/about/api'

export const Route = createFileRoute('/about/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(getCertificationsOptions()),
      queryClient.ensureQueryData(getHobbiesOptions()),
    ])
  },
})

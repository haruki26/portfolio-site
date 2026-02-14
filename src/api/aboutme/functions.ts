import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import { createClient } from '@/lib/microcms/index.server'

const _fetchAboutMe = createServerOnlyFn(async () => {
  const client = createClient()
  const res = await client.getObject({
    endpoint: 'aboutme',
  })

  return res
})

const fetchAboutMe = createServerFn().handler(async () => {
  const data = await _fetchAboutMe()
  return data
})

export { fetchAboutMe }

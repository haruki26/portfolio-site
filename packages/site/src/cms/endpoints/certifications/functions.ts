import { createClient } from '@/libs/microcms'

const fetchCertifications = async () => {
  const client = createClient()
  return await client.getList({
    endpoint: 'certifications',
  })
}

export { fetchCertifications }

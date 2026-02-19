import { createClient } from '@/lib/microcms'

const fetchHobbies = () => {
  const client = createClient()
  return client.getList({
    endpoint: 'hobbies',
  })
}

export { fetchHobbies }

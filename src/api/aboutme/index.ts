import { queryOptions } from '@tanstack/react-query'
import { fetchAboutMe } from './functions'
import { aboutMeKeys } from './key'

const fetchAboutMeQueryOptions = () =>
  queryOptions({
    queryKey: aboutMeKeys.detail(),
    queryFn: fetchAboutMe,
  })

export { fetchAboutMeQueryOptions }

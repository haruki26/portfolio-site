import { tryAsync } from '@/lib/result'
import { fetchHobbies } from './functions'
import { hobbyMapper } from './mapper'

const getHobbies = () =>
  tryAsync(async () => {
    const res = await fetchHobbies()
    return res.contents.map(hobbyMapper)
  })

export { getHobbies }

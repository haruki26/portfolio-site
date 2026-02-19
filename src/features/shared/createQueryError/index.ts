import { QueryError } from '@/errors'
import type { SerializableError } from '@/libs/result'

const createQueryError = (e: SerializableError) => {
  const error = new QueryError(e.message)
  error.name = e.name
  error.stack = e.stack
  return error
}

export { createQueryError }

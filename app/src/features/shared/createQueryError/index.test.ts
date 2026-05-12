import { QueryError } from '@/errors'
import { createQueryError } from '.'

describe('createQueryError', () => {
  it('SerializableError から QueryError を生成する', () => {
    const error = createQueryError({
      name: 'CustomError',
      message: 'request failed',
      stack: 'stacktrace',
    })

    expect(error).toBeInstanceOf(QueryError)
    expect(error.name).toBe('CustomError')
    expect(error.message).toBe('request failed')
    expect(error.stack).toBe('stacktrace')
  })
})

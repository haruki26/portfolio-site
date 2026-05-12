import { Result } from '@praha/byethrow'

const onOk = <T>(value: T) => Result.succeed(value)

const onError = <T>(error: T) => Result.fail(error)

const tryAsync = async <T>(callback: () => Promise<T>) => {
  let result = null
  try {
    result = onOk(await callback())
  } catch (err) {
    if (err instanceof Error) {
      result = onError(err)
    }
  }

  if (result === null) return onError(new Error('Unknown error occurred.'))
  return result
}

interface SerializableError {
  name: string
  message: string
  stack?: string
}

const toSerializableResult = <T>(
  result: Result.Result<T, Error>,
): Result.Result<T, SerializableError> =>
  result.type === 'Success'
    ? result
    : onError({
        name: result.error.name,
        message: result.error.message,
        stack: result.error.stack,
      })

export { onOk, onError, tryAsync, toSerializableResult }
export type { SerializableError }

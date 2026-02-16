import { Result } from '@praha/byethrow'

const onOk = <T>(value: T) => Result.succeed(value)

const onError = <T extends Error>(error: T) => Result.fail(error)

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

export { onOk, onError, tryAsync }

interface SerializableError {
  name: string
  message: string
  stack?: string
}

type SuccessType = "success"
type FailType = "fail"

interface BaseResult {
  resultType: SuccessType | FailType
}

interface Success<TValue> extends BaseResult {
  resultType: SuccessType
  value: TValue
}

interface Fail<TError> extends BaseResult {
  resultType: FailType
  error: TError
}

type Result<TSuccess, TFail> = Success<TSuccess> | Fail<TFail>

const tryAsync = async <TValue>(callbackfn: () => Promise<TValue>): Promise<Result<TValue, SerializableError>> => {
  try {
    return {
      resultType: "success",
      value: await callbackfn()
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        resultType: "fail",
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      }
    }
  }
  return {
    resultType: "fail",
    error: {
      name: "UnknownError",
      message: "Unknown error occurred."
    }
  }
}

export type { SerializableError }
export { tryAsync }

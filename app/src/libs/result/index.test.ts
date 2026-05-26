import { tryAsync } from '.'

describe('result helpers', () => {
  it('tryAsync は成功時に success を返す', async () => {
    await expect(tryAsync(async () => 42)).resolves.toEqual({
      resultType: 'success',
      value: 42,
    })
  })

  it('tryAsync は Error を投げたとき fail を返す', async () => {
    const error = new Error('boom')

    const result = await tryAsync(async () => {
      throw error
    })

    expect(result).toEqual({
      resultType: 'fail',
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    })
  })

  it('tryAsync は非 Error を投げたとき Unknown error を返す', async () => {
    const result = await tryAsync(async () => {
      throw 'oops'
    })

    expect(result).toEqual({
      resultType: 'fail',
      error: {
        name: 'UnknownError',
        message: 'Unknown error occurred.',
      },
    })
  })
})

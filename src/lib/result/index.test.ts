import { onError, onOk, tryAsync } from '.'

describe('result helpers', () => {
  it('onOk は Success を返す', () => {
    expect(onOk('value')).toEqual({
      type: 'Success',
      value: 'value',
    })
  })

  it('onError は Failure を返す', () => {
    const error = new Error('failed')
    expect(onError(error)).toEqual({
      type: 'Failure',
      error,
    })
  })

  it('tryAsync は成功時に Success を返す', async () => {
    await expect(tryAsync(async () => 42)).resolves.toEqual({
      type: 'Success',
      value: 42,
    })
  })

  it('tryAsync は Error を投げたとき Failure を返す', async () => {
    const error = new Error('boom')

    await expect(
      tryAsync(async () => {
        throw error
      }),
    ).resolves.toEqual({
      type: 'Failure',
      error,
    })
  })

  it('tryAsync は非 Error を投げたとき Unknown error を返す', async () => {
    const result = await tryAsync(async () => {
      throw 'oops'
    })

    expect(result).toMatchObject({
      type: 'Failure',
      error: expect.any(Error),
    })
    expect(result.error.message).toBe('Unknown error occurred.')
  })
})

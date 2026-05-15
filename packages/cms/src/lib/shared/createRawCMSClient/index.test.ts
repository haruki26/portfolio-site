import { describe, expect, it, vi } from 'vitest'
import { createRawCMSClient } from '@/lib/shared/createRawCMSClient'

describe('createRawCMSClient', () => {
  it('getter 呼び出し時に初期化し、以降は同一インスタンスを返す', () => {
    const factory = vi.fn((arg: string) => ({ id: 'client', arg }))
    const getClient = createRawCMSClient(factory, 'arg')

    expect(factory).not.toHaveBeenCalled()

    const first = getClient()
    const second = getClient()
    const third = getClient()

    expect(factory).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledWith('arg')
    expect(first).toBe(second)
    expect(second).toBe(third)
  })
})

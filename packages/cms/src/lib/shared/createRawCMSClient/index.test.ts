import { createRawCMSClient } from '@/lib/shared/createRawCMSClient'
import { describe, expect, it, vi } from 'vitest'

describe('createRawCMSClient', () => {
  it('初回アクセス時にのみ factory を実行する', () => {
    const factory = vi.fn((arg: string) => ({ id: 'client', arg }))
    const getClient = createRawCMSClient(factory, 'arg')

    const first = getClient()
    const second = getClient()

    expect(factory).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledWith('arg')
    expect(first).toBe(second)
  })
})

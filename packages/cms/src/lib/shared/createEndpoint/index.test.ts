import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Certification } from '@/schema'
import { describe, expect, it, vi } from 'vitest'

describe('createEndpointBuilder', () => {
  it('getList と getDetail を構築できる', async () => {
    const client = { key: 'client' }
    const getClient = vi.fn(() => client)
    const getList = vi.fn(async (): Promise<Certification[]> => [
      { name: 'AWS SAA', date: new Date('2026-02-16T00:00:00.000Z') },
    ])
    const getDetail = vi.fn(async (): Promise<Certification | null> => null)

    const endpoint = createEndpointBuilder(getClient)
      .addGetListFn(() => getList)
      .addGetDetailFn(() => getDetail)
      .build()

    expect(getClient).toHaveBeenCalledTimes(1)
    await expect(endpoint.getList()).resolves.toEqual([
      { name: 'AWS SAA', date: new Date('2026-02-16T00:00:00.000Z') },
    ])
    await expect(endpoint.getDetail('id-1')).resolves.toBeNull()
  })
})

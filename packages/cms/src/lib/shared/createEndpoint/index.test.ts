import { describe, expect, it, vi } from 'vitest'
import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Certification } from '@/schema'
import type { ListResponse } from '@/type'

describe('createEndpointBuilder', () => {
  it('getList と getDetail を構築できる', async () => {
    const client = { key: 'client' }
    const getClient = vi.fn(() => client)
    const getList = vi.fn(
      async (): Promise<ListResponse<Certification>> => ({
        contents: [
          { name: 'AWS SAA', date: new Date('2026-02-16T00:00:00.000Z') },
        ],
        totalCount: 1,
      }),
    )
    const getDetail = vi.fn(async (): Promise<Certification | null> => null)

    const endpoint = createEndpointBuilder(getClient)
      .addGetListFn(() => getList)
      .addGetDetailFn(() => getDetail)
      .build()

    expect(getClient).toHaveBeenCalledTimes(1)
    await expect(endpoint.getList()).resolves.toEqual({
      contents: [
        { name: 'AWS SAA', date: new Date('2026-02-16T00:00:00.000Z') },
      ],
      totalCount: 1,
    })
    await expect(endpoint.getDetail('id-1')).resolves.toBeNull()
  })
})

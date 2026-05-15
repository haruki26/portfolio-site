import { describe, expect, it, vi } from 'vitest'
import { createCertificationsEndpoint } from '@/lib/microcms/endpoints/certifications'

describe('createCertificationsEndpoint', () => {
  it('certifications を取得して date を Date に変換する', async () => {
    const getList = vi.fn(async () => ({
      contents: [{ name: 'AWS SAA', date: '2026-02-16T00:00:00.000Z' }],
      totalCount: 1,
      offset: 0,
      limit: 10,
    }))
    const endpoint = createCertificationsEndpoint(() => ({ getList }) as never)

    const result = await endpoint.getList()

    expect(getList).toHaveBeenCalledWith({
      endpoint: 'certifications',
    })
    expect(result).toEqual([
      { name: 'AWS SAA', date: new Date('2026-02-16T00:00:00.000Z') },
    ])
  })
})

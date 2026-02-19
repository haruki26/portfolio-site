import type { Certifications } from '@/lib/microcms/type'
import { certificationMapper } from './index'

describe('certificationMapper', () => {
  it('Certification を返す', () => {
    const input = {
      id: 'certification-1',
      name: 'AWS Certified Developer - Associate',
      date: '2026-02-16T00:00:00.000Z',
      createdAt: '2026-02-14T00:00:00.000Z',
      updatedAt: '2026-02-15T00:00:00.000Z',
      publishedAt: '2026-02-16T00:00:00.000Z',
      revisedAt: '2026-02-17T00:00:00.000Z',
    } satisfies Certifications

    expect(certificationMapper(input)).toEqual({
      name: 'AWS Certified Developer - Associate',
      date: new Date(input.date),
    })
  })
})

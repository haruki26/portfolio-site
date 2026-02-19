import type { Hobby } from '@/features/about/types'
import type { Hobbies } from '@/lib/microcms/type'
import { hobbyMapper } from './index'

describe('hobbyMapper', () => {
  it('Hobby を返す', () => {
    const input = {
      id: 'hobby-1',
      name: 'Photography',
      description: 'I enjoy taking landscape photos.',
      images: [
        {
          url: 'https://example.com/hobbies/photo-1.png',
          width: 1200,
          height: 800,
          alt: 'Mountain view',
        },
        {
          url: 'https://example.com/hobbies/photo-2.png',
          width: 1200,
          height: 800,
          alt: 'Ocean view',
        },
      ],
      createdAt: '2026-02-14T00:00:00.000Z',
      updatedAt: '2026-02-15T00:00:00.000Z',
      publishedAt: '2026-02-16T00:00:00.000Z',
      revisedAt: '2026-02-17T00:00:00.000Z',
    } satisfies Hobbies

    expect(hobbyMapper(input)).toEqual({
      name: 'Photography',
      description: 'I enjoy taking landscape photos.',
      images: [
        {
          src: 'https://example.com/hobbies/photo-1.png',
          width: 1200,
          height: 800,
          alt: 'Mountain view',
        },
        {
          src: 'https://example.com/hobbies/photo-2.png',
          width: 1200,
          height: 800,
          alt: 'Ocean view',
        },
      ],
    } satisfies Hobby)
  })
})

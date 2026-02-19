import type { Hobbies } from '@/lib/microcms/type'
import { hobbyMapper } from './index'

describe('hobbyMapper', () => {
  it('Hobby を返す', () => {
    const input = {
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
    })
  })
})

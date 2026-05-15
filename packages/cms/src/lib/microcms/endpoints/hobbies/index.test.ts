import { describe, expect, it, vi } from 'vitest'
import { createHobbiesEndpoint } from '@/lib/microcms/endpoints/hobbies'

describe('createHobbiesEndpoint', () => {
  it('hobbies を取得して画像を変換する', async () => {
    const getList = vi.fn(async () => ({
      contents: [
        {
          name: 'Photography',
          description: 'Take photos',
          images: [
            {
              url: 'https://example.com/hobby/photo.png',
              alt: 'photo',
              width: 100,
              height: 100,
            },
          ],
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    }))
    const endpoint = createHobbiesEndpoint(() => ({ getList }) as never)

    const result = await endpoint.getList()

    expect(getList).toHaveBeenCalledWith({
      endpoint: 'hobbies',
    })
    expect(result).toEqual([
      {
        name: 'Photography',
        description: 'Take photos',
        images: [
          {
            src: 'https://example.com/hobby/photo.png',
            alt: 'photo',
            width: 100,
            height: 100,
          },
        ],
      },
    ])
  })
})

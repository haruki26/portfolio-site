import { describe, expect, it, vi } from 'vitest'
import { createBlogsEndpoint } from '@/lib/microcms/endpoints/articles/blogs'

const baseArticle = {
  id: 'blog-1',
  title: 'Blog title',
  description: 'Blog description',
  body: '<p>body</p>',
  thumbnail: {
    url: 'https://example.com/article/thumbnail.png',
    width: 640,
    height: 360,
    alt: 'thumbnail',
  },
  tags: [{ id: 'tag-1', name: 'Frontend' }],
  createdAt: '2026-02-14T00:00:00.000Z',
  updatedAt: '2026-02-15T00:00:00.000Z',
  publishedAt: '2026-02-16T00:00:00.000Z',
  revisedAt: '2026-02-17T00:00:00.000Z',
}

describe('createBlogsEndpoint', () => {
  it('getList は一覧取得クエリを実行する', async () => {
    const getList = vi.fn(async () => ({
      contents: [baseArticle],
      totalCount: 1,
      offset: 0,
      limit: 10,
    }))
    const getListDetail = vi.fn()
    const endpoint = createBlogsEndpoint(
      () => ({ getList, getListDetail }) as never,
    )

    const result = await endpoint.getList({ limit: 5, currentPage: 2 })

    expect(getList).toHaveBeenCalledWith({
      endpoint: 'blogs',
      queries: {
        fields: [
          'id',
          'title',
          'description',
          'thumbnail',
          'publishedAt',
          'tags',
        ],
        limit: 5,
        offset: 5,
      },
    })
    expect(result).toEqual([
      {
        id: 'blog-1',
        title: 'Blog title',
        description: 'Blog description',
        thumbnail: {
          src: 'https://example.com/article/thumbnail.png',
          alt: 'thumbnail',
          width: 640,
          height: 360,
        },
        publishedAt: new Date(baseArticle.publishedAt),
        tags: [{ id: 'tag-1', name: 'Frontend' }],
      },
    ])
  })

  it('getDetail は未取得時に null を返す', async () => {
    const getList = vi.fn()
    const getListDetail = vi.fn(async () => {
      throw new Error('not found')
    })
    const endpoint = createBlogsEndpoint(
      () => ({ getList, getListDetail }) as never,
    )

    await expect(endpoint.getDetail('blog-404')).resolves.toBeNull()
  })
})

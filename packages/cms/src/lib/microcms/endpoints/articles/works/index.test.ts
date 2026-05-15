import { describe, expect, it, vi } from 'vitest'
import { createWorksEndpoint } from '@/lib/microcms/endpoints/articles/works'

const baseArticle = {
  id: 'work-1',
  title: 'Work title',
  description: 'Work description',
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

describe('createWorksEndpoint', () => {
  it('getList は一覧取得クエリを実行する', async () => {
    const getList = vi.fn(async () => ({
      contents: [baseArticle],
      totalCount: 1,
      offset: 0,
      limit: 10,
    }))
    const getListDetail = vi.fn()
    const endpoint = createWorksEndpoint(
      () => ({ getList, getListDetail }) as never,
    )

    const result = await endpoint.getList({ limit: 10, currentPage: 3 })

    expect(getList).toHaveBeenCalledWith({
      endpoint: 'works',
      queries: {
        fields: [
          'id',
          'title',
          'description',
          'thumbnail',
          'publishedAt',
          'tags',
        ],
        limit: 10,
        offset: 20,
      },
    })
    expect(result).toHaveLength(1)
  })

  it('getDetail は詳細取得クエリを実行し整形を返す', async () => {
    const getList = vi.fn()
    const getListDetail = vi.fn(async () => baseArticle)
    const endpoint = createWorksEndpoint(
      () => ({ getList, getListDetail }) as never,
    )

    const result = await endpoint.getDetail('work-1')

    expect(getListDetail).toHaveBeenCalledWith({
      endpoint: 'works',
      contentId: 'work-1',
    })
    expect(result).toEqual({
      id: 'work-1',
      title: 'Work title',
      description: 'Work description',
      body: '<p>body</p>',
      thumbnail: {
        src: 'https://example.com/article/thumbnail.png',
        alt: 'thumbnail',
        width: 640,
        height: 360,
      },
      publishedAt: new Date(baseArticle.publishedAt),
      updatedAt: new Date(baseArticle.updatedAt),
      tags: [{ id: 'tag-1', name: 'Frontend' }],
    })
  })
})

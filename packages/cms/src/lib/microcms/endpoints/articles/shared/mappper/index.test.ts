import type { Articles } from '@/lib/microcms/type'
import { NotPublishedError } from '@/lib/microcms/shared/error'
import {
  articleDetailMapper,
  articleOverviewMapper,
} from '@/lib/microcms/endpoints/articles/shared/mappper'
import { describe, expect, it } from 'vitest'

const baseArticle: Articles = {
  id: 'article-1',
  title: 'Article title',
  description: 'Article description',
  body: '<p>body</p>',
  thumbnail: {
    src: 'https://example.com/article/thumbnail.png',
    url: 'https://example.com/article/thumbnail.png',
    width: 640,
    height: 360,
    alt: 'thumbnail',
  },
  tags: [
    {
      id: 'tag-1',
      name: 'Frontend',
      createdAt: '2026-02-10T00:00:00.000Z',
      updatedAt: '2026-02-11T00:00:00.000Z',
      publishedAt: '2026-02-12T00:00:00.000Z',
      revisedAt: '2026-02-13T00:00:00.000Z',
    },
  ],
  createdAt: '2026-02-14T00:00:00.000Z',
  updatedAt: '2026-02-15T00:00:00.000Z',
  publishedAt: '2026-02-16T00:00:00.000Z',
  revisedAt: '2026-02-17T00:00:00.000Z',
}

describe('articleOverviewMapper', () => {
  it('一覧用の article を返す', () => {
    expect(
      articleOverviewMapper({
        id: baseArticle.id,
        title: baseArticle.title,
        description: baseArticle.description,
        thumbnail: baseArticle.thumbnail,
        publishedAt: baseArticle.publishedAt,
        tags: baseArticle.tags,
      }),
    ).toEqual({
      id: 'article-1',
      title: 'Article title',
      description: 'Article description',
      thumbnail: {
        src: 'https://example.com/article/thumbnail.png',
        alt: 'thumbnail',
        width: 640,
        height: 360,
      },
      publishedAt: new Date(baseArticle.publishedAt!),
      tags: baseArticle.tags,
    })
  })

  it('publishedAt が undefined のとき NotPublishedError を投げる', () => {
    expect(() =>
      articleOverviewMapper({
        id: baseArticle.id,
        title: baseArticle.title,
        description: baseArticle.description,
        thumbnail: baseArticle.thumbnail,
        publishedAt: undefined,
        tags: baseArticle.tags,
      }),
    ).toThrowError(NotPublishedError)
  })
})

describe('articleDetailMapper', () => {
  it('詳細用の article を返す', () => {
    expect(articleDetailMapper(baseArticle)).toEqual({
      id: 'article-1',
      title: 'Article title',
      description: 'Article description',
      body: '<p>body</p>',
      thumbnail: {
        src: 'https://example.com/article/thumbnail.png',
        alt: 'thumbnail',
        width: 640,
        height: 360,
      },
      publishedAt: new Date(baseArticle.publishedAt!),
      updatedAt: new Date(baseArticle.updatedAt),
      tags: baseArticle.tags,
    })
  })
})

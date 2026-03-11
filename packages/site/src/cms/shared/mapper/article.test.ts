import { NotPublishedError } from '../error'
import { articleDetailMapper, articleOverviewMapper } from './article'

describe('articleOverviewMapper', () => {
  const baseArticle = {
    id: 'article-1',
    title: 'Article title',
    description: 'Article description',
    body: '<p>body</p>',
    thumbnail: {
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

  it('一覧用の Article を返す', () => {
    const result = articleOverviewMapper({
      id: baseArticle.id,
      title: baseArticle.title,
      description: baseArticle.description,
      thumbnail: baseArticle.thumbnail,
      publishedAt: baseArticle.publishedAt,
      tags: baseArticle.tags,
    })

    expect(result).toEqual({
      id: 'article-1',
      title: 'Article title',
      description: 'Article description',
      thumbnail: {
        src: 'https://example.com/article/thumbnail.png',
        alt: 'thumbnail',
        width: 640,
        height: 360,
      },
      publishedAt: new Date(baseArticle.publishedAt),
      tags: baseArticle.tags,
    })
  })

  it('thumbnail が undefined のとき undefined を返す', () => {
    const result = articleOverviewMapper({
      id: baseArticle.id,
      title: baseArticle.title,
      description: baseArticle.description,
      thumbnail: undefined,
      publishedAt: baseArticle.publishedAt,
      tags: baseArticle.tags,
    })

    expect(result.thumbnail).toBeUndefined()
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
  it('詳細用の Article を返す', () => {
    const article = {
      id: 'article-1',
      title: 'Article title',
      description: 'Article description',
      body: '<p>body</p>',
      thumbnail: {
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

    expect(articleDetailMapper(article)).toEqual({
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
      publishedAt: new Date(article.publishedAt),
      updatedAt: new Date(article.updatedAt),
      tags: article.tags,
    })
  })
})

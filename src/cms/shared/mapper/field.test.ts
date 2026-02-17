import { NotPublishedError } from '../error'
import { publishedAtMapper, thumbnailMapper, updatedAtMapper } from './field'

describe('thumbnailMapper', () => {
  it('thumbnail が undefined のとき undefined を返す', () => {
    expect(thumbnailMapper(undefined)).toBeUndefined()
  })

  it('thumbnail の url と alt を返す', () => {
    const input = {
      url: 'https://example.com/thumbnail.png',
      height: 300,
      width: 500,
      alt: 'thumbnail',
    }

    expect(thumbnailMapper(input)).toEqual({
      src: 'https://example.com/thumbnail.png',
      alt: 'thumbnail',
    })
  })
})

describe('updatedAtMapper', () => {
  it('updatedAt を Date に変換する', () => {
    const updatedAt = '2026-02-16T00:00:00.000Z'

    expect(updatedAtMapper(updatedAt)).toEqual(new Date(updatedAt))
  })
})

describe('publishedAtMapper', () => {
  it('publishedAt を Date に変換する', () => {
    const publishedAt = '2026-02-16T00:00:00.000Z'

    expect(publishedAtMapper(publishedAt, 'article-1')).toEqual(
      new Date(publishedAt),
    )
  })

  it('publishedAt が undefined のとき NotPublishedError を投げる', () => {
    expect(() => publishedAtMapper(undefined, 'article-1')).toThrowError(
      NotPublishedError,
    )
    expect(() => publishedAtMapper(undefined, 'article-1')).toThrowError(
      new NotPublishedError('article-1').message,
    )
  })
})

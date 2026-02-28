import { createArticleJsonLD, createCollectionJsonLD } from '.'

describe('libs/createJsonLD', () => {
  it('createCollectionJsonLD は CollectionPage を返す', () => {
    expect(
      createCollectionJsonLD({
        name: 'Blogs',
        url: 'https://example.com/blogs',
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blogs',
      url: 'https://example.com/blogs',
    })
  })

  it('createArticleJsonLD は Article を返し日付を ISO 文字列化する', () => {
    const publishedAt = new Date('2024-01-02T03:04:05.000Z')

    expect(
      createArticleJsonLD({
        title: 'Article title',
        authorName: 'Yosei',
        thumbnailSrc: 'https://example.com/image.png',
        publishedAt,
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Article title',
      author: {
        '@type': 'Person',
        name: 'Yosei',
      },
      image: 'https://example.com/image.png',
      datePublished: '2024-01-02T03:04:05.000Z',
    })
  })
})

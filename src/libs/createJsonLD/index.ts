const createCollectionJsonLD = (vals: { name: string; url: string }) =>
  ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: vals.name,
    url: vals.url,
  }) as const

const createArticleJsonLD = (vals: {
  title: string
  authorName: string
  thumbnailSrc: string
  publishedAt: Date
}) =>
  ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: vals.title,
    author: {
      '@type': 'Person',
      name: vals.authorName,
    },
    image: vals.thumbnailSrc,
    datePublished: vals.publishedAt.toISOString(),
  }) as const

export { createArticleJsonLD, createCollectionJsonLD }

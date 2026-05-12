import { generateHead } from '.'

describe('libs/generateHead', () => {
  const base = {
    title: 'Page title',
    description: 'Page description',
    url: 'https://example.com/page' as const,
    image: 'https://example.com/image.png',
    type: 'article' as const,
  }

  it('meta と canonical link を生成する', () => {
    const head = generateHead(base)

    expect(head.links).toEqual([
      {
        rel: 'canonical',
        href: 'https://example.com/page',
      },
    ])

    expect(head.meta).toEqual([
      { title: 'Page title' },
      { name: 'description', content: 'Page description' },
      { property: 'og:title', content: 'Page title' },
      { property: 'og:description', content: 'Page description' },
      { property: 'og:url', content: 'https://example.com/page' },
      { property: 'og:image', content: 'https://example.com/image.png' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Page title' },
      { name: 'twitter:description', content: 'Page description' },
      { name: 'twitter:url', content: 'https://example.com/page' },
      { name: 'twitter:image', content: 'https://example.com/image.png' },
    ])
  })

  it('jsonLD があると scripts を生成する', () => {
    const head = generateHead({
      ...base,
      jsonLD: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Page title',
      },
    })

    expect(head.scripts).toEqual([
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Page title',
        }),
      },
    ])
  })

  it('jsonLD がないと scripts は undefined', () => {
    expect(generateHead(base).scripts).toBeUndefined()
  })
})

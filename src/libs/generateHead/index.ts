interface OpenGraph {
  property: `og:${string}`
  content: string
}

interface TwitterCard {
  name: `twitter:${string}`
  content: string
}

export const generateHead = (vals: {
  title: string
  description: string
  url: `https://${string}`
  image: string
}): {
  meta: Array<
    | OpenGraph
    | TwitterCard
    | { title: string }
    | { name: 'description'; content: string }
  >
  links: Array<{ rel: 'canonical'; href: `https://${string}` }>
} => ({
  meta: [
    {
      title: vals.title,
    },
    {
      name: 'description',
      content: vals.description,
    },
    {
      property: 'og:title',
      content: vals.title,
    },
    {
      property: 'og:description',
      content: vals.description,
    },
    {
      property: 'og:url',
      content: vals.url,
    },
    {
      property: 'og:image',
      content: vals.image,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: vals.title,
    },
    {
      name: 'twitter:description',
      content: vals.description,
    },
    {
      name: 'twitter:url',
      content: vals.url,
    },
    {
      name: 'twitter:image',
      content: vals.image,
    },
  ],
  links: [{ rel: 'canonical', href: vals.url }],
})

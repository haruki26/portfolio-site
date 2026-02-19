import { NotPublishedError } from '@/cms/shared/error'
import type { Blogs } from '@/lib/microcms/type'
import type { Blog } from '../type'
import { blogDetailMapper, blogOverviewMapper } from './index'

const baseBlog = {
  id: 'blog-1',
  title: 'My Blog',
  description: 'Blog description',
  body: '<p>blog body</p>',
  thumbnail: {
    url: 'https://example.com/blogs/thumbnail.png',
    width: 500,
    height: 300,
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
} satisfies Blogs

describe('blogOverviewMapper', () => {
  it('一覧用の Blog を返す', () => {
    const result = blogOverviewMapper({
      id: baseBlog.id,
      title: baseBlog.title,
      description: baseBlog.description,
      thumbnail: baseBlog.thumbnail,
      publishedAt: baseBlog.publishedAt,
      tags: baseBlog.tags,
    })

    expect(result).toEqual({
      id: 'blog-1',
      title: 'My Blog',
      description: 'Blog description',
      thumbnail: {
        src: 'https://example.com/blogs/thumbnail.png',
        alt: 'thumbnail',
        width: 500,
        height: 300,
      },
      publishedAt: new Date(baseBlog.publishedAt),
      tags: baseBlog.tags,
    })
  })

  it('publishedAt が undefined のとき NotPublishedError を投げる', () => {
    expect(() =>
      blogOverviewMapper({
        id: baseBlog.id,
        title: baseBlog.title,
        description: baseBlog.description,
        thumbnail: baseBlog.thumbnail,
        publishedAt: undefined,
        tags: baseBlog.tags,
      }),
    ).toThrowError(NotPublishedError)
    expect(() =>
      blogOverviewMapper({
        id: baseBlog.id,
        title: baseBlog.title,
        description: baseBlog.description,
        thumbnail: baseBlog.thumbnail,
        publishedAt: undefined,
        tags: baseBlog.tags,
      }),
    ).toThrowError(new NotPublishedError(baseBlog.id).message)
  })
})

describe('blogDetailMapper', () => {
  it('詳細用の Blog を返す', () => {
    const result = blogDetailMapper(baseBlog)

    expect(result).toEqual({
      id: 'blog-1',
      title: 'My Blog',
      description: 'Blog description',
      body: '<p>blog body</p>',
      thumbnail: {
        src: 'https://example.com/blogs/thumbnail.png',
        alt: 'thumbnail',
        width: 500,
        height: 300,
      },
      publishedAt: new Date(baseBlog.publishedAt),
      updatedAt: new Date(baseBlog.updatedAt),
      tags: baseBlog.tags,
    } satisfies Blog)
  })
})

import { NotPublishedError } from '@/cms/shared/error'
import type { Work } from '@/features/work/types'
import type { Works } from '@/lib/microcms/type'
import { workDetailMapper, workOverviewMapper } from './index'

const baseWork = {
  id: 'work-1',
  title: 'Portfolio Site',
  description: 'My portfolio site',
  body: '<p>detail body</p>',
  thumbnail: {
    url: 'https://example.com/works/thumbnail.png',
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
} satisfies Works

describe('workOverviewMapper', () => {
  it('一覧用の Work を返す', () => {
    const result = workOverviewMapper({
      id: baseWork.id,
      title: baseWork.title,
      description: baseWork.description,
      thumbnail: baseWork.thumbnail,
      publishedAt: baseWork.publishedAt,
      tags: baseWork.tags,
    })

    expect(result).toEqual({
      id: 'work-1',
      title: 'Portfolio Site',
      description: 'My portfolio site',
      thumbnail: {
        src: 'https://example.com/works/thumbnail.png',
        alt: 'thumbnail',
        width: 500,
        height: 300,
      },
      publishedAt: new Date(baseWork.publishedAt),
      tags: baseWork.tags,
    })
  })

  it('publishedAt が undefined のとき NotPublishedError を投げる', () => {
    expect(() =>
      workOverviewMapper({
        id: baseWork.id,
        title: baseWork.title,
        description: baseWork.description,
        thumbnail: baseWork.thumbnail,
        publishedAt: undefined,
        tags: baseWork.tags,
      }),
    ).toThrowError(NotPublishedError)
    expect(() =>
      workOverviewMapper({
        id: baseWork.id,
        title: baseWork.title,
        description: baseWork.description,
        thumbnail: baseWork.thumbnail,
        publishedAt: undefined,
        tags: baseWork.tags,
      }),
    ).toThrowError(new NotPublishedError(baseWork.id).message)
  })
})

describe('workDetailMapper', () => {
  it('詳細用の Work を返す', () => {
    const result = workDetailMapper(baseWork)

    expect(result).toEqual({
      id: 'work-1',
      title: 'Portfolio Site',
      description: 'My portfolio site',
      body: '<p>detail body</p>',
      thumbnail: {
        src: 'https://example.com/works/thumbnail.png',
        alt: 'thumbnail',
        width: 500,
        height: 300,
      },
      publishedAt: new Date(baseWork.publishedAt),
      updatedAt: new Date(baseWork.updatedAt),
      tags: baseWork.tags,
    } satisfies Work)
  })
})

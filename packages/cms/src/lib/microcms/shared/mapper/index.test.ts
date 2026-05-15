import { describe, expect, it } from 'vitest'
import { dateMapper, imageMapper } from '@/lib/microcms/shared/mapper'

describe('imageMapper', () => {
  it('url を src に変換する', () => {
    expect(
      imageMapper({
        url: 'https://example.com/image.png',
        alt: 'sample',
        width: 640,
        height: 480,
      }),
    ).toEqual({
      src: 'https://example.com/image.png',
      alt: 'sample',
      width: 640,
      height: 480,
    })
  })
})

describe('dateMapper', () => {
  it('日付文字列を Date に変換する', () => {
    expect(dateMapper('2026-02-16T00:00:00.000Z')).toEqual(
      new Date('2026-02-16T00:00:00.000Z'),
    )
  })

  it('undefined の場合は null を返す', () => {
    expect(dateMapper(undefined)).toBeNull()
  })
})

import { dateMapper, imageMapper } from './field'

describe('imageMapper', () => {
  it('url を src に変換して返す', () => {
    const input = {
      url: 'https://example.com/image.png',
      alt: 'sample',
      width: 640,
      height: 480,
    }

    expect(imageMapper(input)).toEqual({
      src: 'https://example.com/image.png',
      alt: 'sample',
      width: 640,
      height: 480,
    })
  })
})

describe('dateMapper', () => {
  it('日付文字列を Date に変換する', () => {
    const input = '2026-02-16T00:00:00.000Z'

    expect(dateMapper(input)).toEqual(new Date(input))
  })
})

import { toUpperFirst } from '.'

describe('toUpperFirst', () => {
  it('先頭文字を大文字に変換する', () => {
    expect(toUpperFirst('haruki')).toBe('Haruki')
  })

  it('空文字をそのまま返す', () => {
    expect(toUpperFirst('')).toBe('')
  })

  it('日本語文字列を与えた場合は同じ文字列を返す', () => {
    expect(toUpperFirst('やまだ')).toBe('やまだ')
  })
})

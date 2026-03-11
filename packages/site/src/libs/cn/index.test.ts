import { cn } from '.'

describe('cn', () => {
  it('twMerge によって競合クラスを解決する', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('clsx 入力（オブジェクト）を結合できる', () => {
    expect(cn('text-sm', { 'font-bold': true, hidden: false })).toBe(
      'text-sm font-bold',
    )
  })
})

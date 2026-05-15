import { calcPaging } from '@/lib/microcms/endpoints/articles/shared/paging'
import { describe, expect, it } from 'vitest'

describe('calcPaging', () => {
  it('currentPage ありの場合 offset を計算する', () => {
    expect(calcPaging({ limit: 10, currentPage: 3 })).toEqual({
      limit: 10,
      offset: 20,
    })
  })

  it('currentPage なしの場合 offset は undefined', () => {
    expect(calcPaging({ limit: 10 })).toEqual({
      limit: 10,
      offset: undefined,
    })
  })
})

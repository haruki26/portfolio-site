import { describe, expect, it } from 'vitest'
import { toDate } from './date'

describe('toDate', () => {
  it('日付文字列を Date に変換する', () => {
    const input = '2026-02-16T00:00:00.000Z'

    expect(toDate(input)).toEqual(new Date(input))
  })
})

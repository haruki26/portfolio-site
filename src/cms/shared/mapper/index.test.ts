import { describe, expect, it } from 'vitest'
import { tagMapper } from './index'

describe('tagMapper', () => {
  it('id と name を持つ Tag を返す', () => {
    const input = { id: 'tag-1', name: 'Frontend' }

    expect(tagMapper(input)).toEqual({
      id: 'tag-1',
      name: 'Frontend',
    })
  })
})

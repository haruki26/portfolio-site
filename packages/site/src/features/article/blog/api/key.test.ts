import { blogsKeys } from './key'

describe('blogsKeys', () => {
  it('list key を生成する', () => {
    const query = { limit: 10, currentPage: 2 }
    expect(blogsKeys.list(query)).toEqual([blogsKeys.all[0], 'lists', query])
  })

  it('detail key を生成する', () => {
    expect(blogsKeys.detail('blog-1')).toEqual([
      blogsKeys.all[0],
      'details',
      'blog-1',
    ])
  })
})

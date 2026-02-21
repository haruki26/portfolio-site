import { worksKeys } from './key'

describe('worksKeys', () => {
  it('list key を生成する', () => {
    const query = { limit: 10, currentPage: 2 }
    expect(worksKeys.list(query)).toEqual([worksKeys.all[0], 'lists', query])
  })

  it('detail key を生成する', () => {
    expect(worksKeys.detail('work-1')).toEqual([
      worksKeys.all[0],
      'details',
      'work-1',
    ])
  })
})

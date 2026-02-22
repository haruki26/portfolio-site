import { aboutKeys } from './key'

describe('aboutKeys', () => {
  it('certifications key を生成する', () => {
    expect(aboutKeys.certifications()).toEqual([
      aboutKeys.all[0],
      'certifications',
    ])
  })

  it('hobbies key を生成する', () => {
    expect(aboutKeys.hobbies()).toEqual([aboutKeys.all[0], 'hobbies'])
  })
})

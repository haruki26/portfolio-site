import { fetchHobbies } from './functions'

const { mockCreateClient, mockGetList } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockGetList: vi.fn(),
}))

vi.mock('@/libs/microcms', () => ({
  createClient: mockCreateClient,
}))

describe('hobbies functions', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      getList: mockGetList,
    })
  })

  it('fetchHobbies は hobbies endpoint を取得する', async () => {
    await fetchHobbies()

    expect(mockGetList).toHaveBeenCalledWith({
      endpoint: 'hobbies',
    })
  })
})

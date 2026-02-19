import { fetchCertifications } from './functions'

const { mockCreateClient, mockGetList } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockGetList: vi.fn(),
}))

vi.mock('@/libs/microcms', () => ({
  createClient: mockCreateClient,
}))

describe('certifications functions', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      getList: mockGetList,
    })
  })

  it('fetchCertifications は certifications endpoint を取得する', async () => {
    await fetchCertifications()

    expect(mockGetList).toHaveBeenCalledWith({
      endpoint: 'certifications',
    })
  })
})

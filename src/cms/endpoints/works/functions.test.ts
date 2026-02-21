import { fetchWorkDetail, fetchWorksOverview } from './functions'

const { mockCreateClient, mockGetList, mockGetListDetail } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockGetList: vi.fn(),
  mockGetListDetail: vi.fn(),
}))

vi.mock('@/libs/microcms', () => ({
  createClient: mockCreateClient,
}))

describe('works functions', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      getList: mockGetList,
      getListDetail: mockGetListDetail,
    })
  })

  it('fetchWorksOverview は offset を計算して getList を呼ぶ', async () => {
    await fetchWorksOverview({ limit: 10, currentPage: 3 })

    expect(mockGetList).toHaveBeenCalledWith({
      endpoint: 'works',
      queries: {
        fields: [
          'id',
          'title',
          'description',
          'thumbnail',
          'publishedAt',
          'tags',
        ],
        limit: 10,
        offset: 20,
      },
    })
  })

  it('fetchWorkDetail は contentId で getListDetail を呼ぶ', async () => {
    await fetchWorkDetail('work-1')

    expect(mockGetListDetail).toHaveBeenCalledWith({
      endpoint: 'works',
      contentId: 'work-1',
    })
  })
})

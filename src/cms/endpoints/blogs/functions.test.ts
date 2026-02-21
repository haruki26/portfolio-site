import { fetchBlogDetail, fetchBlogsOverview } from './functions'

const { mockCreateClient, mockGetList, mockGetListDetail } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockGetList: vi.fn(),
  mockGetListDetail: vi.fn(),
}))

vi.mock('@/libs/microcms', () => ({
  createClient: mockCreateClient,
}))

describe('blogs functions', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      getList: mockGetList,
      getListDetail: mockGetListDetail,
    })
  })

  it('fetchBlogsOverview は offset を計算して getList を呼ぶ', async () => {
    await fetchBlogsOverview({ limit: 5, currentPage: 2 })

    expect(mockGetList).toHaveBeenCalledWith({
      endpoint: 'blogs',
      queries: {
        fields: [
          'id',
          'title',
          'description',
          'thumbnail',
          'publishedAt',
          'tags',
        ],
        limit: 5,
        offset: 5,
      },
    })
  })

  it('fetchBlogDetail は contentId で getListDetail を呼ぶ', async () => {
    await fetchBlogDetail('blog-1')

    expect(mockGetListDetail).toHaveBeenCalledWith({
      endpoint: 'blogs',
      contentId: 'blog-1',
    })
  })
})

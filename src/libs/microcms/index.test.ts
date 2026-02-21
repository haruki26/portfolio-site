const { mockCreateClient, mockGetList, mockGetListDetail } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockGetList: vi.fn(),
  mockGetListDetail: vi.fn(),
}))

vi.mock('microcms-js-sdk', () => ({
  createClient: mockCreateClient,
}))

vi.mock('@/libs/env', () => ({
  appEnv: {
    MICROCMS_SERVICE_DOMAIN: 'service-domain',
    MICROCMS_API_KEY: 'api-key',
  },
}))

describe('libs/microcms createClient', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      getList: mockGetList,
      getListDetail: mockGetListDetail,
    })
  })

  it('env の値で createClient を初期化する', async () => {
    const { createClient } = await import('.')
    createClient()

    expect(mockCreateClient).toHaveBeenCalledWith({
      serviceDomain: 'service-domain',
      apiKey: 'api-key',
    })
  })

  it('getList は endpoint と queries をそのまま委譲する', async () => {
    const { createClient } = await import('.')
    const client = createClient()

    await client.getList({
      endpoint: 'works',
      queries: { fields: ['id', 'title'], limit: 10 },
    })

    expect(mockGetList).toHaveBeenCalledWith({
      endpoint: 'works',
      queries: { fields: ['id', 'title'], limit: 10 },
    })
  })

  it('getListDetail は contentId と queries を委譲する', async () => {
    const { createClient } = await import('.')
    const client = createClient()

    await client.getListDetail({
      endpoint: 'works',
      contentId: 'work-1',
      queries: { fields: ['id'] },
    })

    expect(mockGetListDetail).toHaveBeenCalledWith({
      endpoint: 'works',
      contentId: 'work-1',
      queries: { fields: ['id'] },
    })
  })
})

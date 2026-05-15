import { describe, expect, it, vi } from 'vitest'

const {
  mockCreateClient,
  mockCreateBlogsEndpoint,
  mockCreateWorksEndpoint,
  mockCreateCertificationsEndpoint,
  mockCreateHobbiesEndpoint,
} = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
  mockCreateBlogsEndpoint: vi.fn(),
  mockCreateWorksEndpoint: vi.fn(),
  mockCreateCertificationsEndpoint: vi.fn(),
  mockCreateHobbiesEndpoint: vi.fn(),
}))

vi.mock('@/lib/microcms/client', () => ({
  createClient: mockCreateClient,
}))

vi.mock('@/lib/microcms/endpoints/articles/blogs', () => ({
  createBlogsEndpoint: mockCreateBlogsEndpoint,
}))

vi.mock('@/lib/microcms/endpoints/articles/works', () => ({
  createWorksEndpoint: mockCreateWorksEndpoint,
}))

vi.mock('@/lib/microcms/endpoints/certifications', () => ({
  createCertificationsEndpoint: mockCreateCertificationsEndpoint,
}))

vi.mock('@/lib/microcms/endpoints/hobbies', () => ({
  createHobbiesEndpoint: mockCreateHobbiesEndpoint,
}))

describe('createMicroCMSClient', () => {
  it('各 endpoint を組み立てて返す', async () => {
    const getClient = vi.fn()
    mockCreateClient.mockReturnValue(getClient)
    mockCreateBlogsEndpoint.mockReturnValue({
      getList: vi.fn(),
      getDetail: vi.fn(),
    })
    mockCreateWorksEndpoint.mockReturnValue({
      getList: vi.fn(),
      getDetail: vi.fn(),
    })
    mockCreateCertificationsEndpoint.mockReturnValue({ getList: vi.fn() })
    mockCreateHobbiesEndpoint.mockReturnValue({ getList: vi.fn() })

    const { createMicroCMSClient } = await import('@/lib/microcms')
    const result = createMicroCMSClient({
      serviceDomain: 'service',
      apiKey: 'api-key',
    })

    expect(mockCreateClient).toHaveBeenCalledWith({
      serviceDomain: 'service',
      apiKey: 'api-key',
    })
    expect(mockCreateBlogsEndpoint).toHaveBeenCalledWith(getClient)
    expect(mockCreateWorksEndpoint).toHaveBeenCalledWith(getClient)
    expect(mockCreateCertificationsEndpoint).toHaveBeenCalledWith(getClient)
    expect(mockCreateHobbiesEndpoint).toHaveBeenCalledWith(getClient)
    expect(result).toEqual({
      articles: {
        blogs: mockCreateBlogsEndpoint.mock.results[0]?.value,
        works: mockCreateWorksEndpoint.mock.results[0]?.value,
      },
      certifications: mockCreateCertificationsEndpoint.mock.results[0]?.value,
      hobbies: mockCreateHobbiesEndpoint.mock.results[0]?.value,
    })
  })
})

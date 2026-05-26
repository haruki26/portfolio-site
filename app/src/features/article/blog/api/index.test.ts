import { QueryClient } from '@tanstack/react-query'
import { getBlogOptions, getBlogsOptions } from './index'

const { mockGetBlogs, mockGetBlog, mockCreateQueryError } = vi.hoisted(() => ({
  mockGetBlogs: vi.fn(),
  mockGetBlog: vi.fn(),
  mockCreateQueryError: vi.fn((e: { message: string }) => new Error(e.message)),
}))

vi.mock('../functions', () => ({
  getBlogs: mockGetBlogs,
  getBlog: mockGetBlog,
}))

vi.mock('@/features/shared/createQueryError', () => ({
  createQueryError: mockCreateQueryError,
}))

describe('blog api queryOptions', () => {
  it('getBlogsOptions: Success の value を返す', async () => {
    const queryClient = new QueryClient()
    const blogs = [{ id: 'blog-1' }]
    mockGetBlogs.mockResolvedValueOnce({
      resultType: 'success',
      value: blogs,
    })

    const options = getBlogsOptions({ limit: 10 })
    const result = await queryClient.fetchQuery(options)

    expect(result).toEqual(blogs)
    expect(mockGetBlogs).toHaveBeenCalledWith({ data: { limit: 10 } })
  })

  it('getBlogOptions: Failure のとき QueryError を投げる', async () => {
    const queryClient = new QueryClient()
    const error = { name: 'Error', message: 'failed', stack: 'stack' }
    mockGetBlog.mockResolvedValueOnce({ resultType: 'fail', error })

    const options = getBlogOptions('blog-1')

    await expect(queryClient.fetchQuery(options)).rejects.toThrow('failed')
    expect(mockCreateQueryError).toHaveBeenCalledWith(error)
    expect(mockGetBlog).toHaveBeenCalledWith({ data: { id: 'blog-1' } })
  })
})

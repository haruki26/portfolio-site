import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../test/page/renderWithRouter'

const { mockGetBlogs } = vi.hoisted(() => ({
  mockGetBlogs: vi.fn(),
}))

vi.mock('@/features/article/blog/functions/index.server', () => ({
  getBlogs: mockGetBlogs,
  getBlog: vi.fn(),
}))

describe('blogs page', () => {
  it('ブログ一覧とページネーションを表示する', async () => {
    mockGetBlogs.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 20,
        blogs: [
          {
            id: 'blog-1',
            title: 'ブログ1',
            description: '説明1',
            publishedAt: new Date(2024, 0, 5),
            tags: [],
          },
          {
            id: 'blog-2',
            title: 'ブログ2',
            description: '説明2',
            publishedAt: new Date(2024, 0, 6),
            tags: [],
          },
        ],
      },
    })

    await renderWithRouter('/blogs?page=1')

    expect(await screen.findByText('ブログ1')).toBeInTheDocument()
    expect(screen.getByText('ブログ2')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'next' })).toHaveAttribute(
      'href',
      '/blogs?page=2',
    )
  })

  it('最大ページを超えた場合は最終ページへリダイレクトする', async () => {
    mockGetBlogs.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 15,
        blogs: [
          {
            id: 'blog-1',
            title: 'ブログ1',
            description: '説明1',
            publishedAt: new Date(2024, 0, 5),
            tags: [],
          },
        ],
      },
    })

    await renderWithRouter('/blogs?page=99')

    await waitFor(() => {
      expect(window.location.pathname).toBe('/blogs')
      expect(window.location.search).toBe('?page=2')
    })
  })

  it('totalCountが0の場合はページネーションを表示しない', async () => {
    mockGetBlogs.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 0,
        blogs: [],
      },
    })

    await renderWithRouter('/blogs?page=1')

    expect(screen.queryByRole('link', { name: 'next' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'prev' })).not.toBeInTheDocument()
  })
})

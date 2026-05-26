import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../../test/page/renderWithRouter'

const { mockGetBlog } = vi.hoisted(() => ({
  mockGetBlog: vi.fn(),
}))

vi.mock('@/features/article/blog/functions', () => ({
  getBlogs: vi.fn(),
  getBlog: mockGetBlog,
}))

describe('blog detail page', () => {
  it('ブログ詳細を表示する', async () => {
    mockGetBlog.mockResolvedValue({
      resultType: 'success',
      value: {
        id: 'blog-1',
        title: 'ブログ詳細',
        description: '詳細説明',
        body: '<p>本文</p>',
        publishedAt: new Date(2024, 0, 1),
        updatedAt: new Date(2024, 1, 2),
        tags: [],
      },
    })

    await renderWithRouter('/blogs/blog-1')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'ブログ詳細' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('本文')).toBeInTheDocument()
    expect(screen.getByText('更新日')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All Blogs' })).toHaveAttribute(
      'href',
      '/blogs',
    )
  })
})

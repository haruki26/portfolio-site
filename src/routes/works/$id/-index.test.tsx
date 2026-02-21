import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../../test/page/renderWithRouter'

const { mockGetWork } = vi.hoisted(() => ({
  mockGetWork: vi.fn(),
}))

vi.mock('@/features/article/work/functions/index.server', () => ({
  getWorks: vi.fn(),
  getWork: mockGetWork,
}))

vi.mock('@/features/article/blog/functions/index.server', () => ({
  getBlogs: vi.fn(),
  getBlog: vi.fn(),
}))

describe('work detail page', () => {
  it('作品詳細を表示する', async () => {
    mockGetWork.mockResolvedValue({
      type: 'Success',
      value: {
        id: 'work-1',
        title: '作品詳細',
        description: '詳細説明',
        body: '<p>本文</p>',
        publishedAt: new Date(2024, 0, 1),
        updatedAt: new Date(2024, 1, 2),
        tags: [],
      },
    })

    await renderWithRouter('/works/work-1')

    expect(
      await screen.findByRole('heading', { level: 2, name: '作品詳細' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('本文')).toBeInTheDocument()
    expect(screen.getByText('更新日')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All Works' })).toHaveAttribute(
      'href',
      '/works',
    )
  })
})

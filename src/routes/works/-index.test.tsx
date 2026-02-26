import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../test/page/renderWithRouter'

const { mockGetWorks } = vi.hoisted(() => ({
  mockGetWorks: vi.fn(),
}))

vi.mock('@/features/article/work/functions/index.server', () => ({
  getWorks: mockGetWorks,
  getWork: vi.fn(),
}))

describe('works page', () => {
  it('作品一覧とページネーションを表示する', async () => {
    mockGetWorks.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 20,
        works: [
          {
            id: 'work-1',
            title: '作品1',
            description: '説明1',
            publishedAt: new Date(2024, 0, 5),
            tags: [],
          },
          {
            id: 'work-2',
            title: '作品2',
            description: '説明2',
            publishedAt: new Date(2024, 0, 6),
            tags: [],
          },
        ],
      },
    })

    await renderWithRouter('/works?page=1')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Work' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('作品1')).toBeInTheDocument()
    expect(screen.getByText('作品2')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'next' })).toHaveAttribute(
      'href',
      '/works?page=2',
    )
  })

  it('最大ページを超えた場合は最終ページへリダイレクトする', async () => {
    mockGetWorks.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 15,
        works: [
          {
            id: 'work-1',
            title: '作品1',
            description: '説明1',
            publishedAt: new Date(2024, 0, 5),
            tags: [],
          },
        ],
      },
    })

    await renderWithRouter('/works?page=99')

    await waitFor(() => {
      expect(window.location.pathname).toBe('/works')
      expect(window.location.search).toBe('?page=2')
    })
  })

  it('totalCountが0の場合はページネーションを表示しない', async () => {
    mockGetWorks.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 0,
        works: [],
      },
    })

    await renderWithRouter('/works?page=1')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Work' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'next' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'prev' })).not.toBeInTheDocument()
  })
})

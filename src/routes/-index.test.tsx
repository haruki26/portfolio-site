import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../test/page/renderWithRouter'

const { mockGetWorks } = vi.hoisted(() => ({
  mockGetWorks: vi.fn(),
}))

vi.mock('@/features/article/work/functions/index.server', () => ({
  getWorks: mockGetWorks,
  getWork: vi.fn(),
}))

describe('home page', () => {
  it('トップページにプロフィールと作品一覧を表示する', async () => {
    mockGetWorks.mockResolvedValue({
      type: 'Success',
      value: {
        totalCount: 1,
        works: [
          {
            id: 'work-1',
            title: '作品A',
            description: '作品Aの説明',
            publishedAt: new Date(2024, 0, 5),
            tags: [],
          },
        ],
      },
    })

    renderWithRouter('/')

    expect(await screen.findByText('Welcome')).toBeInTheDocument()
    expect(
      screen.getByText(
        'TypeScriptやPythonなど様々な言語について学んでいます。',
      ),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Works' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('作品A')).toBeInTheDocument()
    expect(screen.getByText('作品Aの説明')).toBeInTheDocument()

    await waitFor(() => {
      expect(mockGetWorks).toHaveBeenCalledWith({ data: { limit: 3 } })
    })
  })
})

import { render, screen } from '@testing-library/react'
import PageFrame from '.'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <a href="/">{children}</a>
  ),
}))

describe('PageFrame', () => {
  it('ページ見出し・アイコン・子要素を表示する', () => {
    const Icon = ({ className }: { className: string }) => (
      <svg data-testid="page-icon" className={className} />
    )

    render(
      <PageFrame Icon={Icon} pageName="Works">
        <div>page content</div>
      </PageFrame>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'Works' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('page-icon')).toBeInTheDocument()
    expect(screen.getByText('page content')).toBeInTheDocument()
  })
})

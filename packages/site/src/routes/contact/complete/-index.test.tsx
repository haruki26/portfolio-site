import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../../test/page/renderWithRouter'

describe('contact complete page', () => {
  it('完了メッセージとトップへの導線を表示する', async () => {
    await renderWithRouter('/contact/complete')

    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: '送信が完了しました',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('まさかURL直打ちで来てないよね...?'),
    ).toBeInTheDocument()
    const links = screen.getAllByRole('link', { name: 'Back to top' })
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/')
    }
  })
})

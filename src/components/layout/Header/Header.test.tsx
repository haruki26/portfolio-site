import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '.'

describe('Header', () => {
  it('ハンバーガーボタンで開閉状態を切り替える', async () => {
    const user = userEvent.setup()
    const { container } = render(<Header />)
    const button = screen.getByRole('button')
    const lines = container.querySelectorAll('button span')

    expect(screen.getByText('yosei.dev')).toBeInTheDocument()
    expect(lines).toHaveLength(3)
    expect(lines[0]).not.toHaveClass('translate-y-2', 'rotate-45')
    expect(lines[1]).not.toHaveClass('opacity-0')
    expect(lines[2]).not.toHaveClass('-translate-y-2', '-rotate-45')

    await user.click(button)

    expect(lines[0]).toHaveClass('translate-y-2', 'rotate-45', 'md:translate-y-2.5')
    expect(lines[1]).toHaveClass('opacity-0')
    expect(lines[2]).toHaveClass('-translate-y-2', '-rotate-45', 'md:-translate-y-2.5')
  })
})

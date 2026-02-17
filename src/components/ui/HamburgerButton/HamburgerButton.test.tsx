import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HamburgerButton from '.'

describe('HamburgerButton', () => {
  it('isOpen=trueで開状態クラスを各ラインに適用する', () => {
    const { container } = render(<HamburgerButton isOpen={true} />)
    const lines = container.querySelectorAll('span')

    expect(lines).toHaveLength(3)
    expect(lines[0]).toHaveClass('translate-y-2.5', 'rotate-45')
    expect(lines[1]).toHaveClass('opacity-0')
    expect(lines[2]).toHaveClass('-translate-y-2.5', '-rotate-45')
  })

  it('ボタンクリックでonClickを呼び出す', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<HamburgerButton isOpen={false} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

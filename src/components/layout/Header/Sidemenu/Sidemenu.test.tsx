import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type React from 'react'
import { PAGE } from '@/configs/page'
import Sidemenu from '.'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    onClick,
  }: {
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <a href="/" onClick={onClick}>
      {children}
    </a>
  ),
  MatchRoute: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Sidemenu', () => {
  it('メニュー項目を表示しリンククリックでonCloseを呼び出す', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Sidemenu onClose={onClose} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(Object.keys(PAGE).length)

    await user.click(links[0])

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('オーバーレイクリックでonCloseを呼び出す', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Sidemenu onClose={onClose} />)

    await user.click(screen.getByRole('button'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

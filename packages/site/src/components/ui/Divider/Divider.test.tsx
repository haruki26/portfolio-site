import { render } from '@testing-library/react'
import Divider from '.'

describe('Divider', () => {
  it('デフォルトで横向きのスタイルを適用する', () => {
    const { container } = render(<Divider />)
    const divider = container.firstChild

    expect(divider).toHaveClass('h-2', 'w-full')
    expect(divider).toHaveAttribute('aria-hidden', 'true')
  })

  it('縦向き指定と追加クラスを適用する', () => {
    const { container } = render(
      <Divider direction="vertical" className="custom-class" />,
    )
    const divider = container.firstChild

    expect(divider).toHaveClass('h-full', 'w-2', 'custom-class')
  })
})

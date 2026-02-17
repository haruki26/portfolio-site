import { render, screen } from '@testing-library/react'
import Glass from '.'

describe('Glass', () => {
  it('ベースクラスと追加クラスを適用し、子要素を表示する', () => {
    render(
      <Glass className="custom-class">
        <span>glass child</span>
      </Glass>,
    )

    const child = screen.getByText('glass child')
    const wrapper = child.parentElement

    expect(wrapper).toHaveClass(
      'rounded-3xl',
      'bg-surface-100/10',
      'backdrop-blur-lg',
      'custom-class',
    )
    expect(child).toBeInTheDocument()
  })
})

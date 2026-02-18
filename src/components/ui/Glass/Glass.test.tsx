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
      'rounded-2xl',
      'bg-surface/30',
      'backdrop-blur-[1.5px]',
      'custom-class',
    )
    expect(child).toBeInTheDocument()
  })
})

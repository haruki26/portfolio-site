import { render, screen } from '@testing-library/react'
import LabelWithIcon from '.'

describe('LabelWithIcon', () => {
  it('アイコンと子要素を表示しクラスを適用する', () => {
    render(
      <LabelWithIcon
        Icon={() => <span data-testid="label-icon">icon</span>}
        className="custom-class"
      >
        <span>label text</span>
      </LabelWithIcon>,
    )

    expect(screen.getByTestId('label-icon')).toBeInTheDocument()
    const label = screen.getByText('label text')
    const wrapper = label.parentElement

    expect(wrapper).toHaveClass('flex', 'items-center', 'gap-2', 'custom-class')
  })
})

import { render, screen } from '@testing-library/react'
import NoImage from '.'

describe('NoImage', () => {
  it('プレースホルダーテキストを表示する', () => {
    render(<NoImage className="custom-class" />)

    const text = screen.getByText('No Image')
    const wrapper = text.parentElement

    expect(text).toBeInTheDocument()
    expect(wrapper).toHaveClass('custom-class')
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
  })
})

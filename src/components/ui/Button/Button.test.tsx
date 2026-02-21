import { render, screen } from '@testing-library/react'
import Button from '.'

describe('Button', () => {
  it('button要素とラッパークラスを表示する', () => {
    render(
      <Button type="submit" className="custom-class">
        送信
      </Button>,
    )

    const button = screen.getByRole('button', { name: '送信' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button.parentElement).toHaveClass('custom-class')
  })
})

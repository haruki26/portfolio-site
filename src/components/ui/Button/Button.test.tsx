import { render, screen } from '@testing-library/react'
import Button from '.'

describe('Button', () => {
  it('button要素とクラスを表示する', () => {
    render(
      <Button type="submit" className="custom-class">
        送信
      </Button>,
    )

    const button = screen.getByRole('button', { name: '送信' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveClass('custom-class')
  })
})

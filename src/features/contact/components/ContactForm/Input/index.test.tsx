import { fireEvent, render, screen } from '@testing-library/react'
import Input from '.'

describe('ContactForm Input', () => {
  it('input mode では input を表示し、変更イベントを通知する', () => {
    const onChange = vi.fn()

    render(
      <Input
        formValue={{
          type: 'text',
          name: 'lastName',
          value: '',
          onChange,
        }}
        labelText="LastName"
        inputMode="input"
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Yamada' } })

    expect(input).toHaveAttribute('name', 'lastName')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('textArea mode では textarea を表示する', () => {
    render(
      <Input
        formValue={{
          type: 'text',
          name: 'message',
          value: 'hello',
          onChange: vi.fn(),
        }}
        labelText="Message"
        inputMode="textArea"
      />,
    )

    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'message')
  })

  it('errorMessage がある場合はエラー文言を表示する', () => {
    render(
      <Input
        formValue={{
          type: 'email',
          name: 'email',
          value: 'invalid',
          onChange: vi.fn(),
          errorMessage: 'メールアドレスの形式で入力してください',
        }}
        labelText="Email"
        inputMode="input"
      />,
    )

    expect(
      screen.getByText('メールアドレスの形式で入力してください'),
    ).toBeInTheDocument()
  })
})

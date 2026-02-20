import { render, screen } from '@testing-library/react'
import SectionTitle from '.'

describe('SectionTitle', () => {
  it('見出しとしてラベルを表示する', () => {
    render(<SectionTitle label="Skills" />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills' }),
    ).toBeInTheDocument()
  })
})

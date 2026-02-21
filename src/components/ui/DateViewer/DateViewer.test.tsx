import { render, screen } from '@testing-library/react'
import DateViewer from '.'

describe('DateViewer', () => {
  it('デフォルトでハイフン区切りの日付を表示する', () => {
    render(<DateViewer date={new Date(2024, 0, 5)} />)

    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getAllByText('-')).toHaveLength(2)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('指定した区切り文字で日付を表示する', () => {
    render(<DateViewer date={new Date(2024, 0, 5)} separator="hyphen" />)

    expect(screen.getAllByText('hyphen')).toHaveLength(2)
  })
})

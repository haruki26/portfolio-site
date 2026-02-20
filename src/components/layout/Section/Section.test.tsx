import { render, screen } from '@testing-library/react'
import Section from '.'

describe('Section', () => {
  it('セクションタイトルと子要素を表示する', () => {
    render(
      <Section sectionLabel="Profile">
        <p>section body</p>
      </Section>,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Profile' }),
    ).toBeInTheDocument()
    expect(screen.getByText('section body')).toBeInTheDocument()
  })
})

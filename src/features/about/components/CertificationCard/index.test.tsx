import { render, screen } from '@testing-library/react'
import CertificationCard from '.'

describe('CertificationCard', () => {
  it('認定名と日付を表示する', () => {
    render(
      <CertificationCard
        certification={{
          name: 'AWS Certified Solutions Architect',
          date: new Date(2024, 4, 20),
        }}
      />,
    )

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'AWS Certified Solutions Architect',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getAllByText('/')).toHaveLength(2)
  })
})

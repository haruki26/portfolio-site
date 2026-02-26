import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../test/page/renderWithRouter'

vi.mock('@/features/contact/components/ContactForm', () => ({
  default: () => <div>mock contact form</div>,
}))

describe('contact page', () => {
  it('Contact セクションとフォームを表示する', async () => {
    await renderWithRouter('/contact')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Contact' }),
    ).toBeInTheDocument()
    expect(screen.getByText('mock contact form')).toBeInTheDocument()
  })
})

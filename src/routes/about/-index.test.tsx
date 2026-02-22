import { screen, within } from '@testing-library/react'
import { MY_INFO } from '@/configs/myInfo'
import { renderWithRouter } from '../../../test/page/renderWithRouter'

const { mockGetCertifications } = vi.hoisted(() => ({
  mockGetCertifications: vi.fn(),
}))
const { mockGetHobbies } = vi.hoisted(() => ({
  mockGetHobbies: vi.fn(),
}))

vi.mock('@/features/about/functions/index.server', () => ({
  getCertifications: mockGetCertifications,
  getHobbies: mockGetHobbies,
}))

describe('about page', () => {
  it('プロフィールと認定・趣味情報を表示する', async () => {
    mockGetCertifications.mockResolvedValue({
      type: 'Success',
      value: [
        { name: 'Zeta Certification', date: new Date(2025, 0, 10) },
        { name: 'Alpha Certification', date: new Date(2024, 0, 10) },
      ],
    })
    mockGetHobbies.mockResolvedValue({
      type: 'Success',
      value: [
        {
          name: 'Photography',
          description: '旅先で写真を撮っています。',
          images: [
            { src: '/hobby.png', alt: '趣味画像', width: 120, height: 120 },
          ],
        },
      ],
    })

    await renderWithRouter('/about')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Profile' }),
    ).toBeInTheDocument()
    expect(screen.getByText(MY_INFO.lastName)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Certification' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Hobby' }),
    ).toBeInTheDocument()
    expect(screen.getByText('旅先で写真を撮っています。')).toBeInTheDocument()

    const certificationSection = screen
      .getByRole('heading', { level: 2, name: 'Certification' })
      .closest('section')
    const certificationTitles = within(certificationSection as HTMLElement)
      .getAllByRole('heading', { level: 3 })
      .map((title) => title.textContent)

    expect(certificationTitles).toEqual([
      'Alpha Certification',
      'Zeta Certification',
    ])
  })
})

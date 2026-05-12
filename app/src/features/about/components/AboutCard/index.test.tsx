import { render, screen } from '@testing-library/react'
import { MY_INFO } from '@/configs/myInfo'
import { toUpperFirst } from '@/libs/toUpperFirst'
import AboutCard from '.'

describe('AboutCard', () => {
  it('プロフィール情報と説明文を表示する', () => {
    render(<AboutCard />)

    const icon = screen.getByRole('img', {
      name: `${MY_INFO.lastName} ${MY_INFO.firstName}のプロフィール画像`,
    })

    expect(icon).toHaveAttribute('src', expect.stringContaining('icon.svg'))
    expect(screen.getByText(MY_INFO.lastName)).toBeInTheDocument()
    expect(screen.getByText(MY_INFO.firstName)).toBeInTheDocument()
    expect(
      screen.getByText(toUpperFirst(MY_INFO.lastNameEn)),
    ).toBeInTheDocument()
    expect(
      screen.getByText(toUpperFirst(MY_INFO.firstNameEn)),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'TypeScriptやPythonなど様々な言語について学んでいます。',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText('主にWebフロントの技術に興味があります。'),
    ).toBeInTheDocument()
  })
})

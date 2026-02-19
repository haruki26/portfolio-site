import { render, screen } from '@testing-library/react'
import WelcomeView from '.'

describe('WelcomeView', () => {
  it('ウェルカム見出しと自己紹介文を表示する', () => {
    render(<WelcomeView />)

    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'HarukiKubo' }),
    ).toBeInTheDocument()
    expect(screen.getByText('このサイトでは')).toBeInTheDocument()
    expect(screen.getByText('私のプロフィールや')).toBeInTheDocument()
    expect(screen.getByText('作品についてまとめています')).toBeInTheDocument()
  })
})

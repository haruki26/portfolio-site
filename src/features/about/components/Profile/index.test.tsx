import { render, screen } from '@testing-library/react'
import { MY_INFO } from '@/configs/myInfo'
import { toUpperFirst } from '@/libs/toUpperFirst'
import Profile from '.'

describe('Profile', () => {
  it('プロフィール情報を表示する', () => {
    render(<Profile />)

    expect(screen.getByText(MY_INFO.lastName)).toBeInTheDocument()
    expect(screen.getByText(MY_INFO.firstName)).toBeInTheDocument()
    expect(
      screen.getByText(toUpperFirst(MY_INFO.lastNameEn)),
    ).toBeInTheDocument()
    expect(
      screen.getByText(toUpperFirst(MY_INFO.firstNameEn)),
    ).toBeInTheDocument()
    expect(screen.getByText(String(MY_INFO.birthday.month))).toBeInTheDocument()
    expect(screen.getByText(String(MY_INFO.birthday.day))).toBeInTheDocument()
    expect(screen.getByText('ISTP')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })
})

/** @vitest-environment jsdom */

import { act, renderHook } from '@testing-library/react'
import { useContactForm } from '.'

const { mockSendForm, mockNavigate, mockUseNavigate } = vi.hoisted(() => ({
  mockSendForm: vi.fn(),
  mockNavigate: vi.fn(),
  mockUseNavigate: vi.fn(),
}))

vi.mock('../functions', () => ({
  sendForm: mockSendForm,
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')

  return {
    ...actual,
    useNavigate: mockUseNavigate,
  }
})

describe('useContactForm', () => {
  beforeEach(() => {
    mockUseNavigate.mockReturnValue(mockNavigate)
  })

  it('送信成功時に完了ページへ遷移する', async () => {
    mockSendForm.mockResolvedValueOnce({ resultType: 'success', value: true })

    const { result } = renderHook(() => useContactForm())

    await act(async () => {
      result.current.form.setFieldValue('lastName', 'Yamada')
      result.current.form.setFieldValue('firstName', 'Taro')
      result.current.form.setFieldValue('email', 'taro@example.com')
      result.current.form.setFieldValue('message', 'hello')
      await result.current.form.handleSubmit()
    })

    expect(mockSendForm).toHaveBeenCalledWith({
      data: {
        lastName: 'Yamada',
        firstName: 'Taro',
        email: 'taro@example.com',
        message: 'hello',
      },
    })
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/contact/complete' })
  })

  it('送信失敗時は遷移しない', async () => {
    mockSendForm.mockResolvedValueOnce({
      resultType: 'fail',
      error: { name: 'Error', message: 'failed', stack: '' },
    })

    const { result } = renderHook(() => useContactForm())

    await act(async () => {
      result.current.form.setFieldValue('lastName', 'Yamada')
      result.current.form.setFieldValue('firstName', 'Taro')
      result.current.form.setFieldValue('email', 'taro@example.com')
      result.current.form.setFieldValue('message', 'hello')
      await result.current.form.handleSubmit()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

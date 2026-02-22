import { QueryClient } from '@tanstack/react-query'
import { getCertificationsOptions, getHobbiesOptions } from './index'

const { mockGetCertifications, mockGetHobbies, mockCreateQueryError } =
  vi.hoisted(() => ({
    mockGetCertifications: vi.fn(),
    mockGetHobbies: vi.fn(),
    mockCreateQueryError: vi.fn(
      (e: { message: string }) => new Error(e.message),
    ),
  }))

vi.mock('../functions/index.server', () => ({
  getCertifications: mockGetCertifications,
  getHobbies: mockGetHobbies,
}))

vi.mock('@/features/shared/createQueryError', () => ({
  createQueryError: mockCreateQueryError,
}))

describe('about api queryOptions', () => {
  it('getCerticationsOptions: Success の value を返す', async () => {
    const queryClient = new QueryClient()
    const certifications = [{ name: 'cert-1' }]
    mockGetCertifications.mockResolvedValueOnce({
      type: 'Success',
      value: certifications,
    })

    const result = await queryClient.fetchQuery(getCertificationsOptions())

    expect(result).toEqual(certifications)
    expect(mockGetCertifications).toHaveBeenCalledWith()
  })

  it('getHobbiesOptions: Failure のとき QueryError を投げる', async () => {
    const queryClient = new QueryClient()
    const error = { name: 'Error', message: 'failed', stack: 'stack' }
    mockGetHobbies.mockResolvedValueOnce({ type: 'Failure', error })

    await expect(queryClient.fetchQuery(getHobbiesOptions())).rejects.toThrow(
      'failed',
    )
    expect(mockCreateQueryError).toHaveBeenCalledWith(error)
    expect(mockGetHobbies).toHaveBeenCalledWith()
  })
})

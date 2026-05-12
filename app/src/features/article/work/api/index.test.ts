import { QueryClient } from '@tanstack/react-query'
import { getWorkOptions, getWorksOptions } from './index'

const { mockGetWorks, mockGetWork, mockCreateQueryError } = vi.hoisted(() => ({
  mockGetWorks: vi.fn(),
  mockGetWork: vi.fn(),
  mockCreateQueryError: vi.fn((e: { message: string }) => new Error(e.message)),
}))

vi.mock('../functions', () => ({
  getWorks: mockGetWorks,
  getWork: mockGetWork,
}))

vi.mock('@/features/shared/createQueryError', () => ({
  createQueryError: mockCreateQueryError,
}))

describe('work api queryOptions', () => {
  it('getWorksOptions: Success の value を返す', async () => {
    const queryClient = new QueryClient()
    const works = [{ id: 'work-1' }]
    mockGetWorks.mockResolvedValueOnce({ type: 'Success', value: works })

    const options = getWorksOptions({ limit: 10 })
    const result = await queryClient.fetchQuery(options)

    expect(result).toEqual(works)
    expect(mockGetWorks).toHaveBeenCalledWith({ data: { limit: 10 } })
  })

  it('getWorkOptions: Failure のとき QueryError を投げる', async () => {
    const queryClient = new QueryClient()
    const error = { name: 'Error', message: 'failed', stack: 'stack' }
    mockGetWork.mockResolvedValueOnce({ type: 'Failure', error })

    const options = getWorkOptions('work-1')

    await expect(queryClient.fetchQuery(options)).rejects.toThrow('failed')
    expect(mockCreateQueryError).toHaveBeenCalledWith(error)
    expect(mockGetWork).toHaveBeenCalledWith({ data: { id: 'work-1' } })
  })
})

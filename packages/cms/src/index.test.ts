import { describe, expect, it, vi } from 'vitest'

const { mockCreateMicroCMSClient } = vi.hoisted(() => ({
  mockCreateMicroCMSClient: vi.fn(),
}))

vi.mock('@/lib/microcms', () => ({
  createMicroCMSClient: mockCreateMicroCMSClient,
}))

describe('createCMSClient', () => {
  it('createMicroCMSClient に config を委譲する', async () => {
    const config = { serviceDomain: 'service', apiKey: 'api-key' }
    const expected = { client: true }
    mockCreateMicroCMSClient.mockReturnValue(expected)

    const { createCMSClient } = await import('@/index')
    const result = createCMSClient(config)

    expect(mockCreateMicroCMSClient).toHaveBeenCalledWith(config)
    expect(result).toBe(expected)
  })
})

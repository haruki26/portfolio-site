vi.mock('@tanstack/react-start', () => ({
  createServerOnlyFn: (fn: unknown) => fn,
  createServerFn: () => ({
    inputValidator: () => ({
      handler: (fn: unknown) => fn,
    }),
  }),
}))

vi.mock('@/libs/env', () => ({
  appEnv: {
    FORM_API_URL: 'https://example.com/form',
  },
}))

const loadSendForm = async () => {
  const mod = await import('./index.server')
  return mod.sendForm
}

describe('contact sendForm', () => {
  const mockFetch = vi.fn()
  const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    consoleLogSpy.mockClear()
  })

  it('正常レスポンス時は Success(true) を返す', async () => {
    const sendForm = await loadSendForm()

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true }),
    })

    const result = await sendForm({
      lastName: 'Yamada',
      firstName: 'Taro',
      email: 'taro@example.com',
      message: 'hello',
    })

    expect(result).toEqual({
      type: 'Success',
      value: true,
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/form',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }),
    )

    const requestInit = mockFetch.mock.calls[0][1]
    const body = requestInit?.body

    expect(body).toBeInstanceOf(FormData)
    expect(body.get('lastName')).toBe('Yamada')
    expect(body.get('firstName')).toBe('Taro')
    expect(body.get('email')).toBe('taro@example.com')
    expect(body.get('message')).toBe('hello')
  })

  it('レスポンス形式が不正な場合は Failure を返す', async () => {
    const sendForm = await loadSendForm()

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: 'yes' }),
    })

    const result = await sendForm({
      lastName: 'Yamada',
      firstName: 'Taro',
      email: 'taro@example.com',
      message: 'hello',
    })

    expect(result).toMatchObject({
      type: 'Failure',
      error: {
        name: 'Error',
        message: 'Received invalid response.',
      },
    })
  })

  it('fetch が失敗した場合は Failure を返す', async () => {
    const sendForm = await loadSendForm()

    mockFetch.mockRejectedValueOnce(new Error('network error'))

    const result = await sendForm({
      lastName: 'Yamada',
      firstName: 'Taro',
      email: 'taro@example.com',
      message: 'hello',
    })

    expect(result).toMatchObject({
      type: 'Failure',
      error: {
        name: 'Error',
        message: 'network error',
      },
    })
  })
})

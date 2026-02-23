const ORIGINAL_ENV = process.env

describe('appEnv', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env = { ...ORIGINAL_ENV }
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  it('必須環境変数があるとき値を読み取る', async () => {
    process.env.MICROCMS_API_KEY = 'test-api-key'
    process.env.MICROCMS_SERVICE_DOMAIN = 'test-domain'
    process.env.FORM_API_URL = 'https://example.com/form'

    const { appEnv } = await import('.')

    expect(appEnv).toEqual({
      MICROCMS_API_KEY: 'test-api-key',
      MICROCMS_SERVICE_DOMAIN: 'test-domain',
      FORM_API_URL: 'https://example.com/form',
    })
  })

  it('必須環境変数が欠けているときエラーを投げる', async () => {
    delete process.env.MICROCMS_API_KEY
    delete process.env.MICROCMS_SERVICE_DOMAIN
    delete process.env.FORM_API_URL

    await expect(import('.')).rejects.toThrowError(
      'Environment variable "env type is invalid',
    )
  })

  it('FORM_API_URL が欠けているときエラーを投げる', async () => {
    process.env.MICROCMS_API_KEY = 'test-api-key'
    process.env.MICROCMS_SERVICE_DOMAIN = 'test-domain'
    delete process.env.FORM_API_URL

    await expect(import('.')).rejects.toThrowError(
      'Environment variable "env type is invalid',
    )
  })
})

import 'dotenv/config'
import z from 'zod'

class EnvError extends Error {
  constructor(variable: string) {
    super(`Environment variable "${variable}" is not set or invalid.`)
    this.name = 'EnvError'
  }
}

const envSchema = z.object({
  MICROCMS_API_KEY: z.string(),
  MICROCMS_SERVICE_DOMAIN: z.string(),
  FORM_API_URL: z.string(),
})

const parseEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new EnvError(
        `env type is invalid: ${error.issues.map((i) => i.message).join(', ')}`,
      )
    }
    throw error
  }
}

export const appEnv = parseEnv()

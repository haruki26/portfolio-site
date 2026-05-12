import type z from 'zod'
import type { contactFormSchema, sendFormResponseSchema } from './schemas'

type ContactFormSchema = z.infer<typeof contactFormSchema>
type SendFormResponseSchema = z.infer<typeof sendFormResponseSchema>

export type { ContactFormSchema, SendFormResponseSchema }

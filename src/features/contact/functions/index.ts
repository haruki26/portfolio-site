import { createServerFn } from '@tanstack/react-start'
import { toSerializableResult } from '@/libs/result'
import { contactFormSchema } from '../schemas'
import { sendForm as _sendForm } from './index.server'

const sendForm = createServerFn({ method: 'POST' })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => toSerializableResult(await _sendForm(data)))

export { sendForm }

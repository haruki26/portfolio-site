import { createServerFn } from '@tanstack/react-start'
import { contactFormSchema } from '../schemas'
import { sendForm as _sendForm } from './index.server'

const sendForm = createServerFn({ method: 'POST' })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => await _sendForm(data))

export { sendForm }

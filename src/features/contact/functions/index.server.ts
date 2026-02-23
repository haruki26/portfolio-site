import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import { appEnv } from '@/libs/env'
import { toSerializableResult, tryAsync } from '@/libs/result'
import { contactFormSchema, sendFormResponseSchema } from '../schemas'
import type { ContactFormSchema, SendFormResponseSchema } from '../types'

const createFormData = (data: ContactFormSchema): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}

const handleSendForm = async (
  formData: FormData,
): Promise<SendFormResponseSchema> => {
  const response = await fetch(appEnv.FORM_API_URL, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
  const json = await response.json()

  console.log(json)
  const jsonData = sendFormResponseSchema.safeParse(json)

  if (jsonData.success) {
    return jsonData.data
  }
  throw new Error('Received invalid response.')
}

const _sendForm = createServerOnlyFn(async (data: ContactFormSchema) => {
  const formData = createFormData(data)
  return tryAsync(async () => {
    const res = await handleSendForm(formData)
    return res.ok
  })
})

const sendForm = createServerFn({ method: 'POST' })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => toSerializableResult(await _sendForm(data)))

export { sendForm }

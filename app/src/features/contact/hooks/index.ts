import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { sendForm } from '../functions'
import { contactFormSchema } from '../schemas'

export const useContactForm = () => {
  const navigate = useNavigate()

  const form = useForm({
    validators: {
      onSubmit: contactFormSchema,
    },
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      const result = await sendForm({ data: value })

      if (result.resultType === 'success' && result.value) {
        return navigate({ to: '/contact/complete' })
      }
    },
  })

  return { form }
}

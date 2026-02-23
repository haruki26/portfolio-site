import z from 'zod'

const nameSchema = z
  .string({ error: '必須項目です' })
  .min(1, { error: '1文字以上で入力してください' })
  .max(50, { error: '50文字以下で入力してください' })

const contactFormSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z.email({ error: 'メールアドレスの形式で入力してください' }),
  message: z
    .string({ error: '1文字以上50文字以下で入力してください' })
    .min(1, { error: '1文字以上で入力してください' })
    .max(500, { error: '500文字以下で入力してください' }),
})

const sendFormResponseSchema = z.object({
  ok: z.boolean(),
})

export { contactFormSchema, sendFormResponseSchema }

import z from 'zod'


const getArticleListSchema = z
  .union([
    z.object({
      currentPage: z.undefined().optional(),
      limit: z.number().optional(),
    }),
    z.object({
      currentPage: z.number(),
      limit: z.number(),
    }),
  ])
  .optional()

const getArticleDetailSchema = z.object({
  id: z.string(),
})

export { getArticleDetailSchema, getArticleListSchema }

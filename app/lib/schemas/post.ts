import { z } from 'zod'

export const postSchema = z.object({
  content: z.coerce.string().min(1).max(777),
  authorId: z.coerce
    .number()
    .int()
    .positive({ message: 'AuthorId must be a positive number' })
})

export const shareSchema = z.object({
  content: z.coerce.string().min(1).max(777),
  authorId: z.coerce
    .number()
    .int()
    .positive({ message: 'AuthorId must be a positive number' }),
  postId: z.coerce.number().min(1),
  shareType: z.enum(['RETWEET', 'QUOTE'])
})

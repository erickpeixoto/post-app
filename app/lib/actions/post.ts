'use server'

import { revalidatePath } from 'next/cache'
import { postSchema } from '@/app/lib/schemas/post'
import { savePost } from '../post'

export async function createPost(params: FormData) {
  const { content, authorId } = Object.fromEntries(params)
  const { error: zodError }: any = postSchema.safeParse({ content, authorId })

  if (zodError) {
    return { error: zodError.format() }
  }
  const dataParsed = postSchema.parse({ content, authorId })

  const { error }: any = await savePost({
    content: dataParsed.content,
    authorId: dataParsed.authorId,
  })
  if (error) throw new Error(error)
  revalidatePath('/')
}

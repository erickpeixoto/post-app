'use server'

import { revalidatePath } from 'next/cache'
import { postSchema } from '@/app/lib/schemas/post'
import { savePost } from '../post'

export async function createPost(params: FormData) {
  const { content } = Object.fromEntries(params)
  const { error: zodError }: any = postSchema.safeParse({ content })

  if (zodError) {
    return { error: zodError.format() }
  }
  const dataParsed = postSchema.parse({ content })

  const { error }: any = await savePost({
    content: dataParsed.content
  })
  if (error) throw new Error(error)
  revalidatePath('/')
}

'use server'

import { revalidatePath } from 'next/cache'
import { postSchema, shareSchema } from '@/app/lib/schemas/post'
import { savePost, saveShare } from '../post'

export async function createPost(params: FormData) {
  const { content, authorId } = Object.fromEntries(params)
  const { error: zodError }: any = postSchema.safeParse({ content, authorId })

  if (zodError) {
    return { error: zodError.format() }
  }
  const dataParsed = postSchema.parse({ content, authorId })

  const { error }: any = await savePost({
    content: dataParsed.content,
    authorId: dataParsed.authorId
  })
  if (error) return { error }
  revalidatePath('/')
}
export async function createSharePost(params: FormData) {
  const { content, authorId, shareType, postId } = Object.fromEntries(params)
  const { error: zodError }: any = shareSchema.safeParse({
    content,
    authorId,
    shareType,
    postId
  })


  if (zodError) {
    return { error: zodError.format() }
  }
  const dataParsed = shareSchema.parse({ content, authorId, shareType, postId })
  const { error }: any = await saveShare({
    content: dataParsed.content,
    authorId: dataParsed.authorId,
    shareType: dataParsed.shareType,
    postId: dataParsed.postId
  })

if (error) return { error }
  revalidatePath('/')
}

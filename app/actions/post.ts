'use server'

import { revalidatePath } from "next/cache"
import { postSchema } from "@/app/schemas/post"
import { db } from "@/db"

export async function createPost(params: FormData) {
    const {content } = Object.fromEntries(params)
    const { error: zodError } = postSchema.safeParse({ content })

    if (zodError) {
             return { error: zodError.format() }
    }
    const dataParsed = postSchema.parse({ content })

   const { error }: any = await db.post.create({ data: { content: dataParsed.content, authorId: 1 } })
   if (error) throw new Error(error)
    revalidatePath('/')

}
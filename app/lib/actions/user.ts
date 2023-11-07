'use server'

import { revalidatePath } from 'next/cache'
import { userSchema } from '@/app/lib/schemas/user'
import { saveUser } from '@/app/lib/user'

export async function createUser(params: FormData) {
  const data = Object.fromEntries(params)
  const { error: zodError }: any = userSchema.safeParse(data)

  if (zodError) {
    return { error: zodError.format() }
  }
  const dataParsed = userSchema.parse(data)

  const { error }: any = await saveUser(dataParsed)
  if (error) return { error }
  revalidatePath('/user')
}

'use server'

import { revalidatePath } from "next/cache"
 
export async function createUser(user: Iterable<readonly [PropertyKey, string]>) {
    try {
            const response = await fetch(`${process.env.APP_URL_DEV}/api/user`, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(user))
        })
        const data = await response.json()
        revalidatePath('/api/user')
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}
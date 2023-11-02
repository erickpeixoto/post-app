;('')
import { db } from '@/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId } = body
    const follower = await db.follower.create({
      data: {
        userId
      }
    })
    return NextResponse.json(follower)
  } catch (error: any) {
    return new NextResponse(`Follower Error: ${error.message}`, { status: 400 })
  }
}

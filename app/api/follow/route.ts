

import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { followerId, followingId } = body;
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                followerId: followerId,
                followingId: followingId,
                },
            },
            });
             if (existingFollow) {
            throw new Error('Already following this user');
            }
    
            const follow = await db.follow.create({
            data: {
                followerId: followerId,
                followingId: followingId,
            },
            });
          return NextResponse.json(follow);
    } catch (error: any) {
        return new NextResponse(`Post Error: ${error.message}`, { status: 400 })
    }
}


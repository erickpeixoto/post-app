

import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { followerId, followingId } = body;
        const unfollow = await db.follow.delete({
            where: {
              followerId_followingId: {
                followerId: followerId,
                followingId: followingId,
              },
            },
          });
      
          return NextResponse.json(unfollow);
    } catch (error: any) {
        if (error.code === "P2025") {
            throw new Error('Not following this user');
          } else {
         
            return new NextResponse(`Post Error: ${error.message}`, { status: 400 })
          }
        }
        
    }


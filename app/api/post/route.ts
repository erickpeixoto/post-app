import { db } from "@/db"
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { title, content, authorId, rePostComment } = body;
        const post = await db.post.create({
            data: {
              title, 
              content,
              authorId,
              rePostComment
            }
          });
          return NextResponse.json(post);
    } catch (error: any) {
        return new NextResponse(`Post Error: ${error.message}`, { status: 400 })
    }
}

export async function GET() {
    try {
        const posts = await db.post.findMany();
        return NextResponse.json(posts);
    } catch (error: any) {
        return new NextResponse(`Post Error: ${error.message}`, { status: 400 })
    }
}
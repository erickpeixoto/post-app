import { db } from "@/db"
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { name } = body;
        const user = await db.user.create({
            data: {
              name,
            }
          });
  
          return NextResponse.json(user);
    } catch (error: any) {
        return new NextResponse(`User Error: ${error.message}`, { status: 400 })
    }
}

export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json(users);
    } catch (error: any) {
        return new NextResponse(`User Error: ${error.message}`, { status: 400 })
    }
}
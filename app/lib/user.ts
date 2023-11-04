
import { db } from "@/db";

export async function saveUser(params: { name: string, username: string }) {
    try {
      const user = await db.user.create({ data: params })
      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

export async function getAuthUser(id: number) {
  try {
    const user = await db.user.findUnique({
      where: {
       id,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUsers() {
  try {
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            followers: {
                select: {
                    followingId: true,
                },
                },
                following: {
                select: {
                    followerId: true,
                },
                },
                createdAt: true,
        },
    });
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
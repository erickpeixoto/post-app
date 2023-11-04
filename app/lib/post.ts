'use server'

import { db } from '@/db'

export async function savePost(params: { content: string, authorId: number }) {
  try {
    const post = await db.post.create({ data: params })
    return post
  } catch (error: any) {
    throw new Error(error)
  }
}


export async function getPosts(userId: number) {
  try {
    let whereClause = {};
    if (userId !== 0) {
      whereClause = {
        author: {
          followers: {
            some: {
              followingId: userId,
            },
          },
        },
      };
    }

    const posts = await db.post.findMany({
      where: whereClause,
      orderBy: {
        published: 'desc',
      },
      select: {
        id: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

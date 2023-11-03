'use server'

import { db } from '@/db'
import { Post } from '@prisma/client'

export async function savePost(params: Post) {
  try {
    const post = await db.post.create({ data: params })
    return post
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getPosts(authorId?: number) {
  try {
    const posts = await db.post.findMany({
      where: { authorId: authorId },
      orderBy: { published: 'desc' },
      select: {
        id: true,
        content: true,
        published: true,
        author: {
            select: {
                id: true,
                name: true,
            }
        }
    }
    })
    return posts
  } catch (error: any) {
    throw new Error(error)
  }
}


export async function getPostsFromFollowingUsers(userId: number) {
  try {
    const posts = await db.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              followingId: userId,
            },
          },
        },
      },
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
          },
        },
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


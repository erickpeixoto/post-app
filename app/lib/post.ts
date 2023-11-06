'use server'

import { db } from '@/db'

export async function savePost(params: { content: string, authorId: number, originalPostId?: number, isRepost?: boolean }) {
  try {
 
    const data = {
      content: params.content,
      authorId: params.authorId,
      ...(params.originalPostId && { originalPostId: params.originalPostId }),
      ...(params.isRepost && { isRepost: params.isRepost }),
    };

    const post = await db.post.create({ data: data })
    return post
  } catch (error: any) {
    throw new Error(error)
  }
}


export async function getPostsFromFollowingUsers(userId: number) {

  try {
    const posts = await db.post.findMany({
      where: {
        author: {
          following: {
            some: {
              followerId: userId,
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


export async function getPosts() {
  try {
    const posts = await db.post.findMany({
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

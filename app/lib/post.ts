'use server'

import { db } from '@/db'

export async function savePost(params: {
  content: string
  authorId: number
  originalPostId?: number
  isRepost?: boolean
}) {
  try {
    const data = {
      content: params.content,
      authorId: params.authorId,
      ...(params.originalPostId && { originalPostId: params.originalPostId }),
      ...(params.isRepost && { isRepost: params.isRepost })
    }

    const post = await db.post.create({ data: data })
    return post
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function saveShare({
  content,
  authorId,
  shareType,
  originalPostId
}: any) {
  try {
    // Crie um novo post que será o retweet ou quote
    const newSharePost = await db.post.create({
      data: {
        content,
        authorId
      }
    })

    // Agora, relacione esse novo post com o post original como um retweet ou quote
    await db.share.create({
      data: {
        postId: originalPostId, // O post que está sendo compartilhado
        userId: authorId, // O usuário que está compartilhando
        shareType, // RETWEET ou QUOTE
        newPostId: newSharePost.id // O ID do novo post criado acima
      }
    })

    return newSharePost
  } catch (error) {
    // Lide com os erros conforme necessário
    console.error('Failed to save share:', error)
    throw new Error('Failed to save share')
  }
}

// export async function saveShare(params: { postId: number, authorId: number, content?: string, shareType:  "QUOTE" | "RETWEET" }) {
//   try {
//     const data = {
//       postId: params.postId,
//       userId: params.authorId,
//       shareType: params.shareType,
//          ...(params.shareType === 'QUOTE' && params.content && { content: params.content }),
//     };

//     const share = await db.share.create({ data: data });
//     return share;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

export async function getPostsFromFollowingUsers(userId: number) {
  try {
    const posts = await db.post.findMany({
      where: {
        author: {
          following: {
            some: {
              followerId: userId
            }
          }
        }
      },
      orderBy: {
        published: 'desc'
      },
      select: {
        id: true,
        content: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return posts
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        published: 'desc'
      },
      include: {
        sharedPosts: {
          select: {
            id: true,
            content: true,
            shareType: true,
            sharingUser: {
              select: {
                id: true,
                username: true,
                name: true
              }
            },
            sharedPost: {
              select: {
                published: true,
          }
        }
        },
        },
      }
    })

    return posts
  } catch (error: any) {
    throw new Error(error.message)
  }
}

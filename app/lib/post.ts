'use server'

import { db } from '@/db'

export async function savePost(params: {
  content: string
  authorId: number
  originalPostId?: number
  isRepost?: boolean
}) {
  try {
    if (!(await canUserPost(params.authorId))) {
      console.log('Post limit reached for today.')
      return { error: 'Post limit reached for today.' }
    }

    const data = {
      content: params.content,
      authorId: params.authorId,
      ...(params.originalPostId && { originalPostId: params.originalPostId }),
      ...(params.isRepost && { isRepost: params.isRepost })
    }

    const post = await db.post.create({ data: data })
    return post
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function saveShare({ content, authorId, shareType, postId }: any) {
  try {
    let contentOriginalPost = ''
    if (shareType === 'RETWEET') {
      const originalPost = await db.post.findUnique({
        where: {
          id: postId
        },
        select: {
          content: true
        }
      })

      contentOriginalPost = originalPost?.content ?? ''
    }

    if (!(await canUserPost(authorId))) {
      console.log('Post limit reached for today.')
      return { error: 'Post limit reached for today.' }
    }

    const newSharePost = await db.post.create({
      data: {
        content: content || contentOriginalPost,
        authorId
      }
    })

    await db.share.create({
      data: {
        postId: postId,
        userId: authorId,
        shareType,
        newPostId: newSharePost.id
      }
    })

    return newSharePost
  } catch (error) {
    return { error: 'Failed to save share' }
  }
}

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
                published: true
              }
            },
            originalPost: {
              select: {
                published: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    username: true
                  }
                }
              }
            }
          }
        },
        author: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    return posts
  } catch (error: any) {
    return { error: error.message }
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
                published: true
              }
            },
            originalPost: {
              select: {
                published: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    username: true
                  }
                }
              }
            }
          }
        },
        author: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    return posts
  } catch (error: any) {
   return { error: error.message }
  }
}
async function canUserPost(authorId: number) {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(startOfDay)
  endOfDay.setDate(endOfDay.getDate() + 1)

  const postCountToday = await db.post.count({
    where: {
      authorId,
      OR: [
        {
          published: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      ]
    }
  })
  return postCountToday < 5
}

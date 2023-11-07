import { db } from '@/db'

export async function saveUser(params: { name: string; username: string }) {
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
        id
      },
      select: {
        id: true,
        name: true,
        username: true,
        posts: {
          select: {
            id: true,
            content: true,
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
                },
                originalPost: {
                  select: {
                    published: true,
                    content: true,
                    author: {
                      select: {
                        name: true,
                        username: true
                      }
                    }
                  }
                }
              }
            }
           },
        }
      }
    })
    return user
  } catch (error: any) {
    throw new Error(error.message)
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
            followingId: true
          }
        },
        following: {
          select: {
            followerId: true
          }
        },
        createdAt: true,
        _count: {
          select: {
            following: true,
            followers: true,
            posts: true
          }
        }
      }
    })
    return users
  } catch (error: any) {
    throw new Error(error.message)
  }
}

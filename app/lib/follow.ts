'use server'

import { db } from '@/db'

export async function saveFollow(params: {
  followerId: number
  followingId: number
}) {
  try {
    const { followerId, followingId } = params;
    const existingFollow = await db.follow.findUnique({
      where: {
          followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
          },
      },
      });
       if (existingFollow) {
        return { error: 'Already following this user'}
      }

      const follow = await db.follow.create({
      data: {
          followerId: followerId,
          followingId: followingId,
      },
      });
      return follow
  
  } catch (error: any) {
    return { error: error.message }
  }
}



export async function saveUnFollow(params: {
  followerId: number
  followingId: number
}) {
  try {
    const { followerId, followingId } = params;

    const unfollow = await db.follow.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });
      return unfollow
  
  } catch (error: any) {
    return { error: error.message }
  }
}

'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import { User } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { HeartHandshake, Heart } from 'lucide-react'
import { followUser, unfollowUser } from '@/app/lib/follow'
import { useCallback, useMemo, useState } from 'react'


export default function UserList({ users }: { users: User[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const auth = searchParams.get('auth')
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null)

  const authUser: any = useMemo(() => users.find(user => user.id === Number(auth)), [users, auth]);
  
  const isFollowing = useCallback(
    (userId: number) => {
      return authUser?.followers.some((follow: any) => Number(follow.followingId) === userId);
    },
    [authUser]
  );

  return (
    <div className='mt-[50px] flex flex-col gap-3'>
      <Table selectionMode='single' aria-label='User List Table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>USER LOGGED</TableColumn>
          <TableColumn>FOLLOW/UNFOLLOW</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </TableCell>
              <TableCell>
                {searchParams.get('auth') === user.id.toString() ? (
                  <span
                    className='
                    } text-sm 
                  text-green-500
                  '
                  >
                    Logged
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      router.push(`/user?auth=${user.id}`)
                    }}
                    className='
                  cursor-pointer text-sm text-gray-500
                '
                  >
                    Click to login
                  </span>
                )}
              </TableCell>
              <TableCell>
                {user.id === Number(auth) ? (
                  <div className='text-gray-400'>N/A</div>
                ) : isFollowing(user.id) ? (
                  loadingUserId === user.id ? (
                    <LoadingSpinner />
                  ) : (
                    <HeartHandshake
                      onClick={async () => {
                        setLoadingUserId(user.id)
                        try {
                          await unfollowUser(Number(auth), user.id)
                          router.refresh()
                        } catch (error) {
                          console.error('Failed to unfollow user:', error)
                        }
                        setLoadingUserId(null)
                      }}
                      className='h-9 w-9 cursor-pointer p-1 text-pink-500 transition-all'
                    />
                  )
                ) : loadingUserId === user.id ? (
                  <LoadingSpinner />
                ) : (
                  <Heart
                    onClick={async () => {
                      setLoadingUserId(user.id)
                      try {
                        await followUser(Number(auth), user.id)
                        router.refresh()
                      } catch (error) {
                        console.error('Failed to follow user:', error)
                      }
                      setLoadingUserId(null)
                    }}
                    className='h-7 w-7 cursor-pointer text-gray-300 transition-all hover:text-pink-500'
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
function LoadingSpinner() {
  return (
    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500'></div>
  )
}

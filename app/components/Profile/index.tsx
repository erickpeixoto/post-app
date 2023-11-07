import UserList from '@/app/components/Profile/UserList'
import UserForm, { UserFormProps } from '@/app/components/Profile/UserForm'
import { Post, User } from '@prisma/client'
import { createUser } from '@/app/lib/actions/user'
import Modal from '@/app/components/Modal'
import { getAuthUser } from '@/app/lib/user'
import PostList from '../Posts/PostList'
import { ScrollShadow } from '@nextui-org/react'


interface ProfileProps {
  users: User[]
  authId: string | null
}
export default async function Profile({ users, authId }: ProfileProps) {
  const auth = await getAuthUser(parseInt(authId!, 10))

  return (
    <Modal open={true}>
      <div className='flex flex-col gap-3'>
        <UserForm userAction={createUser as UserFormProps['userAction']} />
        <div
          className='mt-[10px] flex w-1/2 flex-col gap-3
        rounded-lg bg-white p-4 shadow dark:bg-gray-800
      '
        >
          <span className='text-sm text-gray-500'>
            At this location, you have the ability to generate a fresh user
            account. However, be mindful that selecting one of them will{' '}
            <span
              className=' 
          font-semibold text-gray-700 dark:text-white
          
          '
            >
              {' '}
              simulate{' '}
            </span>
            a read-only authentication process.
          </span>
        </div>

        <UserList users={users} />

   
        <h3 className='mt-5'>My Posts</h3>
     
        <ScrollShadow className='h-[400px]'>
          {auth && auth?.posts?.length > 0 ?
            <PostList posts={auth?.posts as unknown as Post[]} />
         : (
            <div className='flex flex-col items-center gap-3'>
              <span className='text-sm text-gray-500'>
                You have not created any posts yet.
              </span>
            </div>
          )}
        </ScrollShadow>
      </div>
    </Modal>
  )
}

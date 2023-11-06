import UserList from '@/app/components/UserList'
import UserForm, { UserFormProps } from '@/app/components/UserForm'
import { User } from '@prisma/client'
import { createUser } from '@/app/lib/actions/user'
import Modal from '@/app/components/Modal'

interface ProfileProps {
  users: User[]
}
export default async function Profile({ users }: ProfileProps) {
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
      </div>
    </Modal>
  )
}

import UserList from '@/app/components/UserList'
import UserForm from '@/app/components/UserForm'
import { User } from '@prisma/client'
import { createUser } from '@/app/actions/user'

export default async function User() {
  const users: User[] = await fetch(`${process.env.APP_URL_DEV}/api/user`, {
    cache: 'no-store'
  }).then(res => res.json())
  return (
    <div className='flex flex-col gap-3'>
      <UserForm action={createUser} />
      <UserList users={users} />
    </div>
  )
}

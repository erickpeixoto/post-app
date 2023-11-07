import { getAuthUser } from '@/app/lib/user'
import { Settings } from 'lucide-react'
import Link from 'next/link'

interface UserAuthProps {
  authId: string
}

export const UserAuth = async ({ authId }: UserAuthProps) => {
  const auth = await getAuthUser(parseInt(authId, 10))

  return (
    <div className='fixed right-10 top-8 flex hidden items-center justify-between md:block'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center'>
          <span className='font-semibold truncate max-w-[130px]'>{auth?.name}, </span>
          <span className='ml-1 text-primary '>@{auth?.username}</span>
          <span className='ml-1 text-gray-500'>
            <Link
              href={`?flow=user-profile&auth=${authId}`}
              title='By clicking here, you can select a new user to take charge. Just keep in mind that this is a readonly selection'
            >
              <Settings className='h-6 w-6' />
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

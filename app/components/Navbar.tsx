'use client'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { useSearchParams } from 'next/navigation'

export const Navbar = () => {
  const params = useSearchParams()
  const authId = params.get('auth') ?? '1'

  return (

    <nav className='container flex items-center justify-between pr-[180px]'>
        <Link href='/'>
            <span className='text-[30px] text-pink-500 '>Poster</span>
        </Link>
      <ul className='flex flex-row gap-3'>
        <li>
          <Link href={`/?flow=all&auth=${authId}`}>All posts</Link>
        </li>
        <li>
          <Link href={`/?flow=following&auth=${authId}`}>Following</Link>
        </li>
        <li>
          <Link href={`user/?auth=${authId}`}>Users</Link>
        </li>
      </ul>
      <ThemeSwitcher />
    </nav>
  )
}

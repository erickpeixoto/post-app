'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex gap-4 hidden md:block'>
      <Button size='sm' variant='flat' onClick={() => setTheme('light')}>
        Light
      </Button>
      <Button size='sm' variant='flat' onClick={() => setTheme('dark')}>
        Dark
      </Button>
    </div>
  )
}

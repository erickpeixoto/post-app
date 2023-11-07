import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'
import { SunIcon, MoonIcon, Dice1 } from 'lucide-react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  if (!theme) return null
  return (
    
    <Button size='sm' variant='flat' onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon className='h-5 w-5' />
      ) : (
        <SunIcon className='h-5 w-5' />
      )}
    </Button>
  )
}

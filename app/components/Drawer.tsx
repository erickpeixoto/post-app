'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Drawer } from 'vaul'
import { Button } from '@nextui-org/react'
import { RetweetForm } from './Posts/RetweetForm'

interface MyDrawerProps {
  isOpen: boolean
  handleClose: () => void
  type: 'RETWEET' | 'QUOTE'
  post: any
  retweetAction: (params: FormData) => Promise<void>
  
}

export function MyDrawer({ isOpen, handleClose, type, post, retweetAction }: MyDrawerProps) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])
  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px]'>
          <div className='flex-1 rounded-t-[10px] bg-white p-4 dark:bg-gray-800 dark:text-white flex justify-center'>
            <div  />
            <Button
              type='button'
              variant='ghost'
              onClick={handleClose}
              className='absolute right-3 top-2'
            >
              <X className=' text-black dark:text-white' />
            </Button>
            {type === "RETWEET" && <RetweetForm post={post} handleClose={handleClose} retweetAction={retweetAction} />}
           
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

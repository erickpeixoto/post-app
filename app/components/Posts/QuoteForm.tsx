'use client'

import { Textarea, Button, Avatar, AvatarIcon } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import { useRef, useState } from 'react'

interface RetweetForm {
  post: any
  handleClose: () => void
  retweetAction: (params: FormData) => Promise<void>
}

export const RetweetForm = ({
  post,
  handleClose,
  retweetAction
}: RetweetForm) => {
  const formRef = useRef(null) as any
  const [validationError, setValidationError] = useState({} as any)
  const [characterCount, setCharacterCount] = useState(0)

  async function action(data: FormData) {
   
    const result: any = await retweetAction(data)
    if (result?.error) {
      setValidationError(result?.error)
    } else {
      if (formRef.current.reset) {
        formRef.current.reset()
      }
      setValidationError(null)
    }
  }
  

  return (
    <div className='flex w-2/3 flex-col items-center'>
      {/* Form to save a quote and retweet */}
      <div className='flex flex-col items-center gap-3'>
        <p className='text-lg font-semibold'>Retweet</p>
        <p className='text-sm text-gray-500'>Retweet this to your followers?</p>
        <form ref={formRef} action={action}>
          <Textarea
            placeholder='Add a comment'
            className='w-full'
            isInvalid={validationError?.content}
            onChange={e => setCharacterCount(e.target.value.length)}
            name='content'
          />

          <div className='flex flex-row items-center gap-5'>
            <Button
              type='button'
              variant='ghost'
              className='text-sm text-gray-500'
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='text-sm text-primary'
              onClick={handleClose}
            >
              Retweet
            </Button>
          </div>
          <div className='mt-3 text-sm text-black/70 dark:text-white/60 '>
            {characterCount}/777 characters
      </div>
        </form>
      </div>
      <div
        key={post.id}
        className='mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800'
      >
        <div className='flex space-x-4'>
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
              icon: 'text-black/80'
            }}
          />
          <div className='flex-1'>
            <div className='flex items-center'>
              <p className='font-semibold'>{post?.author?.name}</p>
              <span className='ml-2 text-primary'>
                @{post?.author?.username}
              </span>
              <span className='ml-2 text-primary'>·</span>
              <span className='ml-2 text-primary'>
                {post.published
                  ? formatDistanceToNow(new Date(post.published), {
                      addSuffix: true
                    })
                  : 'N/A'}
              </span>
            </div>
            <p className='mt-2'>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

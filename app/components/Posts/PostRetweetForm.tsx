'use client'

import { Button, Avatar, AvatarIcon } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import { useRef, useState } from 'react'

interface RetweetForm {
  post: any
  handleClose: () => void
  retweetAction: (params: FormData) => void
}

export const RetweetForm = ({
  post,
  handleClose,
  retweetAction
}: RetweetForm) => {
  const formRef = useRef(null) as any
  const [validationError, setValidationError] = useState({} as any)

  async function action(data: FormData) {
    const result: any = await retweetAction(data)
    if (result?.error) {
      console.log(result?.error)
      setValidationError(result)
    } else {
      if (formRef.current.reset) {
        formRef.current.reset()
      }
      setValidationError(null)
    }
  }

  const handleSubmit = (e: any) => {
    if (!validationError?.error) handleClose()
  }

  return (
    <div className='flex w-2/3 flex-col items-center'>
      {validationError?.error && (
        <p
          className='
                   mb-5 mt-5 rounded-lg
                   border border-red-500
                   bg-red-100
                   p-2
                   text-sm
                   font-semibold
                   text-red-500
                 
                 '
        >
          <p>{JSON.stringify(validationError?.error)}</p>
        </p>
      )}

      <div className='flex flex-col items-center gap-5'>
        <p className='text-lg font-semibold'>Retweet</p>
        <p className='text-sm text-gray-500'>Retweet this to your followers?</p>
        <form ref={formRef} action={action}>
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
              onClick={handleSubmit}
            >
              Retweet
            </Button>
          </div>
        </form>
      </div>
      <div
        key={post.id}
        className='mb- mt-10 rounded-lg bg-white p-4 shadow dark:bg-gray-800 '
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

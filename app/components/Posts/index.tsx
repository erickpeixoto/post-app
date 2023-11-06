'use client'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarIcon } from '@nextui-org/react'
import { Repeat2, Quote, X } from 'lucide-react'
import { Post } from '@prisma/client'
import { MyDrawer } from '../Drawer'
import { useEffect, useState } from 'react'

interface PostListProps {
  posts?: Post[]
}

export default function PostList({ posts }: PostListProps) {
  const [open, setOpen] = useState(false)
  const [typeForm, setTypeForm] = useState<'retweet' | 'quote'>("quote")

  const handleOpen = (type: typeof typeForm) => {
    console.log({ type })
    setOpen(true)
    setTypeForm(type)
  }

  return (
    <div>
      <MyDrawer isOpen={open} handleClose={() => setOpen(false)} type={typeForm} />
      <div className='mt-4'>
        {posts?.map((post: any) => (
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

              <div className='flex flex-row items-center gap-5'>
                <button
                  className='flex flex-col items-center border-0 text-tiny'
                  onClick={() => handleOpen('retweet')}
                >
                  <Repeat2 className='h-5 w-5 text-red-400' /> Retweet
                </button>

                <button
                  className='flex flex-col items-center border-0 text-tiny'
                  onClick={() => handleOpen('quote')}
                >
                  <Quote className='h-5 w-5 text-red-400' /> Quote
                </button>
              </div>
            </div>
          </div>
        ))}
        {posts?.length === 0 && (
          <div className='mb-4 mt-6 flex justify-center rounded-lg bg-white p-4 shadow dark:bg-gray-800'>
            <p className='font-semibold'>No posts yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

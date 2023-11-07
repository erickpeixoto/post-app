'use client'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarIcon } from '@nextui-org/react'
import { Repeat2, Quote, X } from 'lucide-react'
import { Post } from '@prisma/client'
import { MyDrawer } from '../Drawer'
import { useState } from 'react'
import { createSharePost } from '@/app/lib/actions/post'
import { useSearchParams } from 'next/navigation'

interface PostListProps {
  posts?: Post[]
}

type TypeForm = 'RETWEET' | 'QUOTE'

export default function PostList({ posts }: PostListProps) {
  const [open, setOpen] = useState(false)
  const [typeForm, setTypeForm] = useState<TypeForm>('RETWEET')
  const [post, setPost] = useState<Post>()
  const useParams = useSearchParams()

  const handleOpen = (type: TypeForm, post: Post) => {
    setOpen(true)
    setTypeForm(type)
    setPost(post)
  }

  const handleRetweetAction = async (data: FormData) => {
    const authId = useParams.get('auth')
    data.append('authorId', authId?.toString() ?? '1')
    data.append('postId', post?.id?.toString() ?? '')
    data.append('shareType', typeForm)

    await createSharePost(data)
  }

  const sharedPostRetweet = (post: any) => {
    const { sharedPosts, content } = post
    const shared = sharedPosts[0]

    switch (shared?.shareType) {
      case 'RETWEET':
        return (
          <div className='m-3 flex gap-2 space-x-4'>
            <Repeat2 className='h-5 w-5 text-red-400' />
            {shared?.sharingUser?.name} Retweeted
            <span className='text-primary'>
              {shared?.sharedPost?.published
                ? formatDistanceToNow(new Date(shared?.sharedPost?.published), {
                    addSuffix: true
                  })
                : 'N/A'}
            </span>
          </div>
        )
      case 'QUOTE':
        return (
          <div className='m-3 flex space-x-4'>
            <Quote className='rotate-360 h-5 w-5 rotate-180 text-red-400' />
            <span> {content} </span>
            <Quote className='h-5 w-5 text-red-400' />
            <span className='text-primary'>
              @{shared?.sharingUser?.username} -
            </span>
            <span className='text-primary'>
              {shared?.sharedPost?.published
                ? formatDistanceToNow(new Date(shared?.sharedPost?.published), {
                    addSuffix: true
                  })
                : 'N/A'}
            </span>
          </div>
        )

      default:
        break
    }
  }

  return (
    <div>
      <MyDrawer
        isOpen={open}
        handleClose={() => setOpen(false)}
        type={typeForm}
        post={post as Post}
        retweetAction={handleRetweetAction}
        quoteAction={handleRetweetAction}
      />
      <div className='mt-4'>
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className='mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800'
          >
            {sharedPostRetweet(post)}

            <div className='mt-6 flex space-x-4'>
              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
                  icon: 'text-black/80'
                }}
              />
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p className='font-semibold'>{
                    post?.sharedPosts?.length > 0
                    ? post?.sharedPosts[0]?.originalPost?.author.name
                    : post?.author?.name
                  }</p>
                  <span className='ml-2 text-primary'>
                    @{post?.sharedPosts?.length > 0
                    ? post?.sharedPosts[0]?.originalPost?.author.username
                    : post?.author?.username}
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
                <p className='mt-2'>
                  {post?.sharedPosts?.length > 0
                    ? post?.sharedPosts[0]?.originalPost?.content
                    : post?.content}
                </p>
              </div>

              <div className='flex flex-row items-center gap-5'>
                <button
                  className='flex flex-col items-center border-0 text-tiny'
                  onClick={() => handleOpen('RETWEET', post)}
                >
                  <Repeat2 className='h-5 w-5 text-red-400' /> Retweet
                </button>

                <button
                  className='flex flex-col items-center border-0 text-tiny'
                  onClick={() => handleOpen('QUOTE', post)}
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

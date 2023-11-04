import { PostForm, PostFormProps } from '@/app/components/PostForm'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarIcon } from '@nextui-org/react'

import { getPosts } from '@/app/lib/post'
import { createPost } from '@/app/lib/actions/post'
import { UserAuth } from './components/UserAuth'

interface SearchParams {
  auth?: string | null
  flow?: string | null
}

export default async function Home({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const param =
    searchParams?.flow === 'following' ? searchParams?.auth ?? '0' : '0'
  const posts = await getPosts(parseInt(param, 10))

  return (
    <div className='min-h-screen'>
      <UserAuth authId={searchParams?.auth ?? '1'} />
      <div className='container mx-auto'>
        <PostForm postAction={createPost as PostFormProps['postAction']} />
        <div className='mt-4'>
          {posts.map(post => (
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
          ))}
          {posts.length === 0 && (
            <div className='mb-4 mt-6 flex justify-center rounded-lg bg-white p-4 shadow dark:bg-gray-800'>
              <p className='font-semibold'>No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

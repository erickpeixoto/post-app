'use client'
import { Avatar, AvatarIcon } from '@nextui-org/react'
import { Post } from '@prisma/client'
import { Quote, Repeat2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useSearchParams } from 'next/navigation'

export type TypeForm = 'RETWEET' | 'QUOTE'

export const PostList = ({
  posts,
  handleOpen,
  authId  
}: {
  posts: Post[]
  handleOpen?: (type: TypeForm, post: Post) => void
  authId?: string | null
}) => {


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
    const useParams = useSearchParams()
    const flow = useParams.get('flow') ?? 'all'

  return (
    <div className='mt-4'>
      {flow !== 'user-profile' && (
         <h3 className='text-xl font-semibold text-black/90 dark:text-white/90 mt-5 mb-5'>
           {flow === 'following' ? 'Following' : 'All'} Posts
          </h3> 
        
      )}

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
                <p className='font-semibold'>
                  {post?.sharedPosts?.length > 0
                    ? post?.sharedPosts[0]?.originalPost?.author.name
                    : post?.author?.name}
                </p>
                <span className='ml-2 text-primary'>
                  @
                  {post?.sharedPosts?.length > 0
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

            {handleOpen && post?.authorId !== Number(authId) && (
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
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList

'use client'

import { Post } from '@prisma/client'
import { MyDrawer } from '../Drawer'
import { useState } from 'react'
import { createSharePost } from '@/app/lib/actions/post'
import { useSearchParams } from 'next/navigation'
import PostList, { TypeForm } from '@/app/components/Posts/PostList'

interface PostListProps {
  posts?: Post[]
}

export default function PostPage({ posts }: PostListProps) {
  const [open, setOpen] = useState(false)
  const [typeForm, setTypeForm] = useState<TypeForm>('RETWEET')
  const [post, setPost] = useState<Post>()
  const useParams = useSearchParams()
  const authId = useParams.get('auth') ?? '1'
  const flow = useParams.get('flow') ?? 'all'

  const handleOpen = (type: TypeForm, post: Post) => {
    setOpen(true)
    setTypeForm(type)
    setPost(post)
  }

  const handleRetweetAction = async (data: FormData) => {
    data.append('authorId', authId?.toString() ?? '1')
    data.append('postId', post?.id?.toString() ?? '')
    data.append('shareType', typeForm)

    return await createSharePost(data)
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
      <PostList posts={posts as Post[]} handleOpen={handleOpen} authId={authId} />
    </div>
  )
}

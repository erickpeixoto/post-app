import { PostForm, PostFormProps } from '@/app/components/Posts/PostForm'
import { getPosts, getPostsFromFollowingUsers } from '@/app/lib/post'
import { createPost } from '@/app/lib/actions/post'
import { UserAuth } from '@/app/components/Profile/UserAuth'
import PostList from '@/app/components/Posts'
import { Post } from '@prisma/client'
import Profile from '@/app/components/Profile'
import { getUsers } from '@/app/lib/user'
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
    searchParams?.flow === 'following' ? searchParams?.auth ?? '0' : '1'
  const users = await getUsers()
  let posts: any = []

  if (searchParams.flow === 'following') {
    posts = await getPostsFromFollowingUsers(parseInt(param, 10))
  } else {
    posts = await getPosts()
  }

  return (
    <div className='min-h-screen'>
      {searchParams?.flow === 'user-profile' && <Profile users={users} authId={searchParams?.auth ?? '0'} />}
      <UserAuth authId={searchParams?.auth ?? '1'} />
      <div className='container mx-auto'>
        <PostForm postAction={createPost as PostFormProps['postAction']} />
        <div className='mt-4'>
          <PostList posts={posts as Post[]} />
        </div>
      </div>
    </div>
  )
}

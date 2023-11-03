import { createPost } from "@/app/lib/actions/post";
import { PostForm, PostFormProps } from "./components/PostForm";
import { getPosts, getPostsFromFollowingUsers } from "./lib/post";
import { formatDistanceToNow } from 'date-fns';
import { User } from "@nextui-org/react";

export default async function Home() {
  const posts = await getPostsFromFollowingUsers(2);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <PostForm postAction={createPost as PostFormProps["postAction"]} />

        <div className="mt-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg shadow mb-4 bg-white dark:bg-gray-800"
            >
              <div className="flex space-x-4">
                <User
                  src="https://placekitten.com/50/50"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-semibold">{post?.author?.name}</p>
                    <span className="text-primary ml-2">@{post?.author?.name}</span>
                    <span className="text-primary ml-2">·</span>
                    <span className="text-primary ml-2">
                      {formatDistanceToNow(new Date(post.published), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-2">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      42
                    </a>
                    {/* Add other actions here */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

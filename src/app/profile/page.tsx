"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { useUser } from "@/app/lib/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogPosts } from "./service";
import { usePost } from "../lib/hooks/usePost";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isAuthenticated } = useUser();
  const {setCurrentPost}=usePost()

    const { data=[]} = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogPosts(user?.id as string ) ,
  });
  console.log(data)

  if (!isAuthenticated || !user) {
    return <div className="text-center text-red-500">Please log in to view your profile.</div>;
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Feed
        </Link>

        <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-rounded scroll-smooth">
          <Link
            href={`/profile/${user.id}`}
            className="absolute top-6 right-6 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            aria-label="Edit Profile"
          >
            <Pencil size={22} />
          </Link>

          <div className="flex items-center gap-6 mb-8">
            <Image
              src={user.avatar|| "/avatars/default.jpg"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user.bio||"No bio available."}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-6">
            My Blogs
          </h2>
          <div className="space-y-4">
            { data?.length> 0 ? (
              data?.map((blog) => (
                <Link
                  key={blog._id}
                  onClick={()=>setCurrentPost(blog)}
                  href={`/blog/${blog._id}`}
                  className="block p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No blogs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
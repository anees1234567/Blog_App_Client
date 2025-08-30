"use client";

import Link from "next/link";
import { Calendar, ArrowLeft, SquarePen } from "lucide-react";
import { useUser } from "@/app/lib/hooks/useUser";
import { usePost } from "@/app/lib/hooks/usePost";
useUser // adjust path

export default function BlogDetailsPage() {
  const { user} = useUser();
  const {post}=usePost()

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Feed
        </Link>

       

        {/* Blog Card */}
        <article className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14">
        
      {  user?.role == "Admin"|| user?.id == post?.author?._id && <Link
         
            href={`/blog/add`}
            className="absolute top-6 right-6 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            aria-label="Edit Blog"
          >
            <SquarePen size={22} />
          </Link>}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-4">
            {post?.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-300">
            <img
              src={post?.author.avatar}
              alt={post?.author.name}
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <div>
              <Link href={`/user/${post?.author._id}`} className="font-medium hover:underline">
                {user?.name}
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} />
                <span>
                  {new Date(post?.createdAt as string).toLocaleDateString()}
                  {post?.updatedAt !== post?.createdAt && (
                    <> • Updated {new Date(post?.updatedAt as string).toLocaleDateString()}</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post?.content as string }}
          />

        
        </article>
      </div>
    </div>
  );
}

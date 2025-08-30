"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createBlogPost } from "../services";
import { saveBlogType } from "../type";
import { useUser } from "@/app/lib/hooks/useUser";
import { usePost } from "@/app/lib/hooks/usePost";
import { useEffect } from "react";



export default function BlogForm() {

  const {user}=useUser()
  const {post,clearCurrentPost}=usePost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: ""
    },
  });

  const {mutate}=useMutation({mutationFn:createBlogPost,onSuccess:()=>{
    clearCurrentPost()
  }})

  const onSubmit = (data:{title:string,content:string}) => {
    const body:saveBlogType={
      title:data.title,
      authorId:post?.author._id as string,
      content:data?.content
    }
    mutate(body)
  };

    useEffect(() => {

    console.log(post?._id)
    reset({
      content: post?.content,
      title: post?.title,
    });

  return () => {
    clearCurrentPost()
    reset({})
  };
}, [ reset,post ]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 sm:px-10">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Feed
        </Link>

        {/* Form Card */}
        <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-8">
           {post?._id?"Edit":"create New"}{" "}Post
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 100,
                    message: "Title must be 100 characters or less",
                  },
                })}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                {...register("content", {
                  required: "Content is required",
                  minLength: {
                    value: 20,
                    message: "Content must be at least 20 characters",
                  },
                })}
                rows={10}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

         

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-md transition"
              >
                <Save size={18} />
                {post?._id?"Update":"Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
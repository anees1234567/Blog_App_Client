"use client";

import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Author, BlogPost } from "@/app/blog/type";
import { usePost } from "../../hooks/usePost";

type BlogCardProps = {
  _id:string
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  href: string;
};

export default function BlogCard({
  _id,
  title,
  content,
  author,
  createdAt,
  updatedAt,
  href,
}: BlogCardProps) {


const { setCurrentPost } = usePost();

  const handleClick = () => {
    setCurrentPost({
      _id,
      title,
      content,
      author,
      createdAt,
      updatedAt ,
      edit:false
    });
  };

  return (
    <div className="group relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-400/30">

      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-transparent to-pink-100 dark:from-indigo-900/20 dark:to-pink-900/20 opacity-60 pointer-events-none" />

      <div className="relative z-10">
        <Link href={href} onClick={handleClick}>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-3 group-hover:underline">
            {title}
          </h2>
        </Link>

        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed line-clamp-3 mb-5">
          {content}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">

        <div
          
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
          ) }
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {author.name}
          </span>
        </div>

        {/* Date */}
        <div className="flex flex-col text-right text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {new Date(createdAt).toLocaleDateString()}
          </span>
          {updatedAt && updatedAt !== createdAt && (
            <span className="italic">Updated {new Date(updatedAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}

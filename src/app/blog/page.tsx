"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/ui/Blogcard";

const blogPosts = [
  { id: "1", title: "Post 1", content: "Lorem ipsum...", author: { name: "Anees", id: "author-1" }, createdAt: "2025-08-20", updatedAt: "2025-08-25", href: "/blog/1" },
  { id: "2", title: "Post 2", content: "Lorem ipsum...", author: { name: "Sarah", id: "author-2" }, createdAt: "2025-08-10", updatedAt: "2025-08-10", href: "/blog/2" },
  { id: "3", title: "Post 3", content: "Lorem ipsum...", author: { name: "David", id: "author-3" }, createdAt: "2025-08-01", updatedAt: "2025-08-18", href: "/blog/3" },
  { id: "4", title: "Post 4", content: "Lorem ipsum...", author: { name: "John", id: "author-4" }, createdAt: "2025-07-22", updatedAt: "2025-07-25", href: "/blog/4" },
  { id: "5", title: "Post 5", content: "Lorem ipsum...", author: { name: "Maya", id: "author-5" }, createdAt: "2025-07-15", updatedAt: "2025-07-15", href: "/blog/5" },
  { id: "6", title: "Post 6", content: "Lorem ipsum...", author: { name: "Liam", id: "author-6" }, createdAt: "2025-07-01", updatedAt: "2025-07-05", href: "/blog/6" },
  { id: "7", title: "Post 7", content: "Lorem ipsum...", author: { name: "Sophia", id: "author-7" }, createdAt: "2025-06-20", updatedAt: "2025-06-25", href: "/blog/7" },
  { id: "8", title: "Post 8", content: "Lorem ipsum...", author: { name: "Alex", id: "author-8" }, createdAt: "2025-06-10", updatedAt: "2025-06-12", href: "/blog/8" },
];

export default function BlogCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const postsPerPage = 6;

  const visiblePosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - postsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + postsPerPage, blogPosts.length - postsPerPage)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700 py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-15">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 leading-tight">
  Featured Blogs ✨
 </h1>

        
        </div>


        <div className="relative">
          {/* Blog Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                href={post.href}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute -left-17 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + postsPerPage >= blogPosts.length}
            className="absolute -right-17 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition disabled:opacity-40"
          >
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 right-4 z-50 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 backdrop-blur-md rounded-3xl shadow-md shadow-indigo-500/30 border border-indigo-300/50 py-3 px-5 max-w-xs transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-end gap-3">
        {/* Feed Tab */}
        <Link
          href="/blog"
          className="px-3 py-1.5 text-sm font-medium text-white bg-white/0 hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
          aria-label="Go to Blog Feed"
        >
          Feed
        </Link>

        {/* Create Post Tab */}
        <Link
          href="/blog/add"
          className="px-3 py-1.5 text-sm font-medium text-white bg-white/0 hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
          aria-label="Create New Post"
        >
          Create
        </Link>

        {/* Profile Tab */}
        <Link
          href="/profile"
          className="px-3 py-1.5 text-sm font-medium text-white bg-white/0 hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
          aria-label="Go to Profile"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
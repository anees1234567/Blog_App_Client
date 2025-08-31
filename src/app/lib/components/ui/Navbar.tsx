"use client";

import Link from "next/link";
import { useUser } from "../../hooks/useUser";

export default function Navbar() {
  const { user, logoutUser } = useUser();

  return (
    <nav className="fixed top-4 right-4 z-50 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 backdrop-blur-md rounded-3xl shadow-md shadow-indigo-500/30 border border-indigo-300/50 py-3 px-5 w-auto max-w-fit transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-end gap-3">

        <Link
          href="/blog"
          className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
        >
          Feed
        </Link>


        <Link
          href="/blog/add"
          className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
        >
          Create
        </Link>

        <Link
          href="/profile"
          className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
        >
          Profile
        </Link>

        {user?.role === "Admin" && (
          <Link
            href="/admin"
            className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
          >
            Admin
          </Link>
        )}

        <Link
          href="/auth/login"
          onClick={() => logoutUser()}
          className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/80 hover:shadow-md hover:border hover:border-indigo-200 hover:text-gray-900 rounded-full transition-all duration-500 hover:scale-105"
        >
          LogOut
        </Link>
      </div>
    </nav>
  );
}

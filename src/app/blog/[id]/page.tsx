import Link from "next/link";
import { Calendar, ArrowLeft, SquarePen } from "lucide-react";

export default function BlogDetailsPage() {
  const blog = {
    id: "1",
    title: "How to Build Stunning UIs with Next.js + Tailwind",
    content: `
      <p>Next.js and Tailwind CSS are a match made in heaven...</p>
    `,
    author: { name: "Anees Hassainar", id: "anees", avatar: "/avatars/anees.jpg" },
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    tags: ["nextjs", "tailwind", "ui"],
  };

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
          {/* Edit Icon (Top Right) */}
          <Link
            href={`/blog/add`}
            className="absolute top-6 right-6 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            aria-label="Edit Blog"
          >
            <SquarePen size={22} />
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-4">
            {blog.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-300">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <div>
              <Link href={`/user/${blog.author.id}`} className="font-medium hover:underline">
                {blog.author.name}
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString()} 
                  {blog.updatedAt !== blog.createdAt && (
                    <> • Updated {new Date(blog.updatedAt).toLocaleDateString()}</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-3">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

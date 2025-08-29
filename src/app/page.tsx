import Link from "next/link";

export const metadata = {
  title: "InspireHub – Discover Stories",
  description:
    "Explore inspiring stories, ideas, and experiences shared by our vibrant community.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700">
      <div className="relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 max-w-2xl mx-4 sm:mx-auto transform transition-all duration-500 hover:scale-[1.02]">
        {/* Glow Decoration */}
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full opacity-30 blur-2xl animate-pulse" />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-400 rounded-full opacity-30 blur-2xl animate-pulse delay-300" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-6 animate-fade-in-down tracking-tight">
          Discover. Share. Inspire.
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed animate-fade-in-up">
          Step into a world of stories that spark creativity, ideas that ignite
          conversations, and voices that deserve to be heard. 🌍✨
        </p>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-white shadow-lg hover:shadow-indigo-400/40 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
            aria-label="Explore blog posts"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}

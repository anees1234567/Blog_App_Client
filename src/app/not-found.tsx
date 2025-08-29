import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center p-6 max-w-md mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-500 mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! Looks like you’re lost in cyberspace. The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Return to blog homepage"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
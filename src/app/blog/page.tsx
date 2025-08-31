"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import BlogCard from "@/components/ui/Blogcard";
import { getAllBlogPosts } from "./services";

export default function BlogPagination() {
  const [page, setPage] = useState(1);
  const postsPerPage = 6;


  const { data,  error ,refetch} = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getAllBlogPosts({ page, limit: postsPerPage }),
     refetchOnMount: true, 
     refetchOnWindowFocus: true,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / postsPerPage) || 1;
  const visiblePosts = data?.items || [];

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  useEffect(() => {
  refetch(); 
}, [ refetch]);



  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700 py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-15">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 leading-tight">
            Featured Blogs ✨
          </h1>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
              <BlogCard

                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                href={`/blog/${post._id}`}
              />
            ))
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">No posts available.</div>
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            className="custom-pagination"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                background: "linear-gradient(to right, #4f46e5, #ec4899)",
                borderRadius: "8px",
                margin: "0 4px",
                "&:hover": {
                  background: "linear-gradient(to right, #5b21b6, #db2777)",
                  transform: "scale(1.05)",
                },
                "&.Mui-selected": {
                  background: "linear-gradient(to right, #7c3aed, #f472b6)",
                  fontWeight: "bold",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
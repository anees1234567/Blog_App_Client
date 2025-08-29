// pages/blog/add.tsx

import BlogForm from "@/components/ui/Blogform";

// import { useRouter } from "next/router";


export default function AddBlogPage() {
//   const router = useRouter();

  const handleAdd = (data:any) => {
    console.log("Add blog:", data);
    // TODO: call API to save
    // router.push("/blogs");
  };

  return (

      <BlogForm  />

  );
}

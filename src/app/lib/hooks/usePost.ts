
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { setPost, clearPost } from "@/app/store/slices/postSlice";
import { BlogType } from "@/app/blog/type";

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.post.post);

  // Set a post (for editing)
  const setCurrentPost = (postData: BlogType) => {
    dispatch(setPost(postData));
  };

  const clearCurrentPost = () => {
    dispatch(clearPost());
  };

  return {
    post,
    setCurrentPost,
    clearCurrentPost,
  };
};

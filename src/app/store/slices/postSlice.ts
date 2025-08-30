
import { BlogType } from "@/app/blog/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type PostState = {
  post: BlogType | null;
};

const initialState: PostState = {
  post: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<BlogType>) => {
      state.post = action.payload; 
    },
    clearPost: (state) => {
      state.post = null; 
    },
  },
});

export const { setPost, clearPost } = postSlice.actions;
export default postSlice.reducer;

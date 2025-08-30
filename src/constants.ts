import axios from 'axios';





const ENDPOINTS = {
 // Auth based Api

  LOGIN: "/user/loginUser",
  REGISTER: "/user/createUser",
  REFRESH_TOKEN: "/auth/refresh",

//   students  based Api
    CREATE_BLOG: "/blog/createBlog",
    GET_BLOGS: "/blog/getAllBlogs",
    GET_BLOGS_BY_USER: "/blog/getBlogsByUser",
    GET_BLOG_BY_ID:`/blog/getBlog`,
    UPDATE_BLOG:`/blog/updateBlog`,
    DELETE_BLOG:`/blog/deleteBlog`,
};

const STORAGE_KEYS = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
};

const Instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})
export { ENDPOINTS, STORAGE_KEYS ,Instance};
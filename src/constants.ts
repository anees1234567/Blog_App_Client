import axios, { AxiosRequestConfig } from 'axios';





const ENDPOINTS = {
 // Auth based Api

  LOGIN: "/user/loginUser",
  REGISTER: "/user/createUser",
  REFRESH_TOKEN: "/user/refresh",
  GET_ALL_USERS: "/user/getAllUsers",
  GET_USER_BY_ID: "/user/getUserById",

//   blog  based Api
    CREATE_BLOG: "/blog/createBlog",
    GET_BLOGS: "/blog/getAllBlogs",
    GET_BLOGS_BY_USER: "/blog/getBlogsByUser",
    GET_BLOG_BY_ID:`/blog/getBlog`,
    UPDATE_BLOG:`/blog/updateBlog`,
    DELETE_BLOG:`/blog/deleteBlog`,
    CREATE_COMMENT:`/blog/createComment`,
    GET_COMMENTS:`/blog/getAllComments`,
    DELETE_COMMENT:`/blog/deleteComment`
};

const STORAGE_KEYS = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
};

const Instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};

Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
     
        await Instance.get(ENDPOINTS.REFRESH_TOKEN, { withCredentials: true });

        // Retry the original request
        const response = await Instance(originalRequest);
        processQueue(null);
        return response;
      } catch (refreshError) {
        processQueue(refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login"; // redirect if refresh fails
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  })
export { ENDPOINTS, STORAGE_KEYS ,Instance};
import { ENDPOINTS, Instance } from "@/constants";
import { BlogType, saveBlogType } from "./type";

Instance
export async function createBlogPost(data:saveBlogType) {

    const response = await Instance.post(ENDPOINTS.CREATE_BLOG, data);
    return response.data;
}

export async function getAllBlogPosts(body: {page?: number, limit?: number}): Promise<{ totalCount: number; items:BlogType[] }> {

    const result = await Instance.post(ENDPOINTS.GET_BLOGS,body);
    return result.data.response;
}

export async function deleteBlogPost(id: string) {
    const response = await Instance.delete(`${ENDPOINTS.DELETE_BLOG}/${id}`);
    return response.data;
}

export async function createComment(body: { postId: string; commentText: string,posterId:string }) {
    const response = await Instance.post(ENDPOINTS.CREATE_COMMENT, body);
    return response.data;
}

export async function getComments(postId: string): Promise<{ _id: string; content: string; poster: { _id: string; name: string; avatar?: string | undefined; }; createdAt: string; }[]> {
    const response = await Instance.get(`${ENDPOINTS.GET_COMMENTS}/${postId}`);
    return response.data.response;
}

export async function deleteComment(id: string) {
    const response = await Instance.delete(`${ENDPOINTS.DELETE_COMMENT}/${id}`);
    return response.data;
}
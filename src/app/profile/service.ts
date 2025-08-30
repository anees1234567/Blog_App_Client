import { ENDPOINTS, Instance } from "@/constants";
import { BlogType } from "../blog/type";

export async function getAllBlogPosts(id: string): Promise<BlogType[]> {
  const result = await Instance.get(`${ENDPOINTS.GET_BLOGS_BY_USER}/${id}`);
  return result.data?.response ?? []; 
}


import { ENDPOINTS, Instance } from "@/constants";
import { BlogType } from "../blog/type";
import { profileUpdateType } from "./type";

export async function getAllBlogPosts(id: string): Promise<BlogType[]> {
  const result = await Instance.get(`${ENDPOINTS.GET_BLOGS_BY_USER}/${id}`);
  return result.data?.response ?? []; 
}
export async function updateProfile(body:profileUpdateType): Promise<any> {
  const result = await Instance.post(`${ENDPOINTS.REGISTER}`,body);
  return result.data?.response; 
}

export async function getProfile(id: string): Promise<any> {
  const result = await Instance.get(`${ENDPOINTS.GET_USER_BY_ID}/${id}`);
  return result.data?.response; 
}


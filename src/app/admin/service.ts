import { ENDPOINTS, Instance } from "@/constants";
import { userType } from "../auth/type";

export async function getAllUsers(): Promise<any[]> {

    const result = await Instance.get(ENDPOINTS.GET_ALL_USERS);
    return result.data.response;
}
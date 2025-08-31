import { ENDPOINTS, Instance } from "@/constants";


export async function getAllUsers() {

    const result = await Instance.get(ENDPOINTS.GET_ALL_USERS);
    return result.data.response;
}
import { ENDPOINTS, Instance } from "@/constants";

import { userType } from "./type";
import { ResponseType } from "../lib/GlobalType/type";


export async function loginService(body:{email: string, password: string}): Promise<ResponseType<userType>|undefined> {
  try {
      const result = await Instance.post(`${ENDPOINTS.LOGIN}`,body,{
        withCredentials: true
      });
      return result.data
  } catch (error) {
    console.error("Login error:", error);
  }
}
export async function registerService(body:{email: string, password: string, name:string}) {
  try {
      const response = await Instance.post(`${ENDPOINTS.REGISTER}`,body);
      return response.data
  } catch (error) {
    console.error("Login error:", error);
  }
}

export async function refreshTokenService() {
  try {
      const response = await Instance.get(`${ENDPOINTS.REFRESH_TOKEN}`);
      return response.data
  } catch (error) {
    console.error("refreshTokenService error:", error);
  }
}

import { ENDPOINTS, Instance } from "@/constants";


export async function loginService(body:{email: string, password: string}) {
  try {
      const result = await Instance.post(`${ENDPOINTS.LOGIN}`,body,{
        withCredentials: true
      });
      return result.data.response
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

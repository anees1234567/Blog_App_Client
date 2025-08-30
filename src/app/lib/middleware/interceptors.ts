import { refreshTokenService } from "@/app/auth/service";
import { Instance } from "@/constants";


Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        try {
            await refreshTokenService();
            return Instance(error.config);
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
        }
        
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login"; 
      }
    }
    return Promise.reject(error);
  }
);



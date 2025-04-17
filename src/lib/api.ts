import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
export const CookieName = "miratonrose48594";
export const RefreshCookieName = "miratonrose48594_refresh";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieName) || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get(RefreshCookieName);
      if (refreshToken) {
        const response = await axios.post(`${baseURL}/refresh-token`, {
          refreshToken,
        });
        if (response.data.status === "success") {
          const newAccessToken = response.data.data?.token;
          const newRefreshToken = response.data.data?.refreshToken;
          Cookies.set(CookieName, newAccessToken);
          Cookies.set(RefreshCookieName, newRefreshToken);
          // Update the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } else {
        Cookies.remove(CookieName);
        Cookies.remove(RefreshCookieName);
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

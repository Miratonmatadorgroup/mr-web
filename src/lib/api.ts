import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';
export const CookieName = 'miratonrose48594';
export const RefreshCookieName = 'miratonrose48594_refresh';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieName) || '';
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
        if (error.response?.status === 401) {
            const refreshToken = Cookies.get(RefreshCookieName);
            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseURL}/refresh-token`, {
                        refreshToken,
                    });
                    const newAccessToken = response.data.token;
                    Cookies.set(CookieName, newAccessToken);
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    // Retry the original request with the new token
                    return apiClient.request(error.config);
                } catch (refreshError) {
                    Cookies.remove(CookieName);
                    Cookies.remove(RefreshCookieName);
                    window.location.href = "/signin";
                    return Promise.reject(refreshError);
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

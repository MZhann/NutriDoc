import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const backendApiInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

const PUBLIC_ENDPOINTS = ["/login", "/greeting", "/register", "/verify-email", "/reset-password"];

// Add access token to request if available
backendApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 / 403 globally
backendApiInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    if ((status === 401 || status === 403) && !isPublic && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      console.warn("Unauthorized or Forbidden. Redirecting to login.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

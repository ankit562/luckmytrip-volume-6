import axios from "axios";
import store from "../store/store";
import { logoutUser } from "../features/auth/authUserSlice";

const getBaseURL = () => {
  return "https://luckmytrip-backend-volume-6.onrender.com/api/v1";
};

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const ignoredPaths = ['/auth/login', '/auth/logout', '/auth/refresh-token'];
    
    if (ignoredPaths.some(path => originalRequest.url?.includes(path))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await instance.post('/auth/refresh-token');
        const newAccessToken = data.accessToken;
        
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return instance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
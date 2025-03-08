import { type InternalAxiosRequestConfig, type AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URI
};

// Token injector function to dynamically get the token
const tokenInjector = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get('accessToken');
  config.headers = config.headers || ({} as AxiosRequestHeaders);
  if (token) {
    (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export { axiosConfig, tokenInjector };

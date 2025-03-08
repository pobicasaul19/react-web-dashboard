import { type InternalAxiosRequestConfig, type AxiosRequestHeaders } from 'axios';

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URI
};

// Token injector function to dynamically get the token
const tokenInjector = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token || null;
  config.headers = config.headers || ({} as AxiosRequestHeaders);
  if (token) {
    (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export { axiosConfig, tokenInjector };

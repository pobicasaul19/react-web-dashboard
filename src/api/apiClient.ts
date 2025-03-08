import axios, { AxiosError, type AxiosInstance } from 'axios';
import { axiosConfig, tokenInjector } from './apiConfig';

export interface ApiError {
  message: string;
  status?: number | null;
  details?: Record<string, unknown>;
}

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

class HttpClient {
  protected axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: axiosConfig.baseURL,
      headers: {
        Accept: 'application/json'
      },
      timeout: 10000,
      withCredentials: true // Add this line to include credentials with every request
    });
  }

  // Utility to determine content type
  private preparePayload(payload: unknown): { data: unknown; headers: Record<string, string> } {
    if (payload instanceof FormData) {
      return { data: payload, headers: { 'Content-Type': 'multipart/form-data' } };
    }

    if (typeof payload === 'object' && payload !== null && Object.values(payload).some((value) => value instanceof File)) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });
      return { data: formData, headers: { 'Content-Type': 'multipart/form-data' } };
    }

    return { data: payload, headers: { 'Content-Type': 'application/json' } };
  }

  // Helper method to handle responses
  private handleResponse<T>(res: unknown): ApiResponse<T> {
    if (axios.isAxiosError(res)) {
      const error: ApiError = {
        message: res.message,
        status: res.response?.status ?? null,
        details: res.response?.data ?? null,
      };
      return { error };
    }
    return (res as { data: ApiResponse<T> }).data;
  }

  // HTTP method wrappers
  public async get<T>(path: string, params?: Record<string, string | number>): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<T>(path, { params });
    return this.handleResponse<T>(response);
  }

  public async post<T, P>(path: string, payload: P): Promise<ApiResponse<T>> {
    const { data, headers } = this.preparePayload(payload);
    const response = await this.axiosInstance.post<T>(path, data, { headers });
    return this.handleResponse<T>(response);
  }

  public async put<T, P>(path: string, payload: P): Promise<ApiResponse<T>> {
    const { data, headers } = this.preparePayload(payload);
    const response = await this.axiosInstance.put<T>(path, data, { headers });
    return this.handleResponse<T>(response);
  }

  public async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<T>(path);
    return this.handleResponse<T>(response);
  }
}

const authorizedClientError = (error: AxiosError): Promise<never> => {
  if (error.response?.status === 403) {
    throw new Error('Unauthorized request');
  }
  return Promise.reject(error);
};

class AuthorizedHttpClient extends HttpClient {
  constructor() {
    super();
    this.axiosInstance.interceptors.request.use(tokenInjector);
    this.axiosInstance.interceptors.response.use(undefined, authorizedClientError);
  }
}

// Create instances of HttpClient and AuthorizedHttpClient
export const authorizedHttpClient = new AuthorizedHttpClient();
export const httpClient = new HttpClient();

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { APIResponse } from '@/types';
import apiClient from './api';
// import apiClient from './api';

// Generalized POST request
export const postRequest = async <T>(
  url: string,
  data: Record<string, string>,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  console.log('Full Request URL:', fullUrl);
  try {
    const response: AxiosResponse<APIResponse<T>> = await apiClient.post(
      url,
      data,
      config
    );
    console.log(fullUrl, data)
    toast.success(response.data.message || 'Request successful!');
    return response.data;
  } catch (error: any) {
    console.error('Error Details:', error.response || error);
    toast.error(error.response?.data?.message || 'An unexpected error occurred.');
    // handleError(error);
    throw error;
  }
};

// Generalized GET request
export const getRequest = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await apiClient.get(url, {
      params,
    });
    toast.success(response.data.message || 'Request successful!');
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

// Generalized PUT request
export const putRequest = async <T>(
  url: string,
  data: Record<string, any>
): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await apiClient.put(
      url,
      data
    );
    toast.success(response.data.message || 'Request successful!');
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

// Generalized DELETE request
export const deleteRequest = async <T>(
  url: string
): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await apiClient.delete(url);
    toast.success(response.data.message || 'Request successful!');
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
};

// Error handler
const handleError = (error: any) => {
  if (error.response) {
    toast.error(error.response.data.message || 'Something went wrong.');
    console.error('API Error:', error.response.data);
  } else {
    toast.error('Unexpected error occurred.');
    console.error('Unexpected Error:', error);
  }
};
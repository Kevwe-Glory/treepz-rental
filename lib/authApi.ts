import { APIResponse } from '@/types';
import { CONSTANTS } from './constant';
import { postRequest } from './generic';
import apiClient from './api';


export interface LoginResponse {
  token: string;
  isVerified: boolean;
}


// export const loginUser = async (
//   email: string, 
//   password: string
// ): Promise<APIResponse<LoginResponse>> => {
//   console.log('LOGIN endpoint', CONSTANTS.login)
//   console.log('Payload:', { email, password });

//   try{
//     const response = await postRequest(CONSTANTS.login, { email, password }); 
//     console.log('Login response:', response);
//     return response;
//   } catch (error: any) {
//     console.error('Login error:', error.response || error);
//     throw new Error(error.response?.data?.message || 'Login failed.')
//   }
// };

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// export const loginUser = async (email: string, password: string): Promise<APIResponse<LoginResponse>> => {
//   const url = `${BASE_URL}${CONSTANTS.login}`;  // Combine the base URL with the endpoint
//   console.log('URL for login:', url); 
//   return postRequest(url, { email, password });
// };

// Login
// export const loginUser = async (email: string, password: string): Promise<APIResponse<LoginResponse>> => {
// // export const loginUser = async (email: string, password: string): Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.login, { email, password });
//   // return postRequest('/auth/sign-in', { email, password });
// };

// Register
// export const registerUser = async (
//   email: string, 
//   password: string,
//   lastName: string, 
//   firstName: string): Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.register, { email, password, firstName, lastName });
// };

// Reset Password
// export const resetPassword = async (email: string): Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.resetPassword, { email });
// };

// export const forgotPassword = async (email: string):
// Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.forgotPassword, { email });
// }
// export const requestVerification = async (email: string):
// Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.requestVerification, { email });
// }
// export const verifyEmail = async (email: string):
// Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.verifyEmail, { email });
// }

// export const changePassword = async (email: string):
// Promise<APIResponse<any>> => {
//   return postRequest(CONSTANTS.changePassword, { email });
// }

// Refresh Token
// export const refreshToken = async (): Promise<APIResponse<any>> => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!refreshToken) throw new Error('Refresh token not found.');
//   return postRequest('/auth/refresh', { refreshToken });
// };

// export const AllVehicles = async(data: string): 
// Promise<APIResponse<any>> => {
//   return getRequest(CONSTANTS.vehicle, { data });
// }

export const AllVehicles = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/vehicles');
    return response;
  } catch (error) {
    console.error('Error in AllVehicles:', error);
    throw error;
  }
};

export const allBookings = async(): Promise<APIResponse<any>> => {
  return getRequest(CONSTANTS.booking)
  // return getRequest('/bookings')
}






import { axiosClient } from '@/api/axiosClient'

const unwrap = (response) => response.data?.data ?? response.data

export const authAPI = {
  login: async (credentials) => unwrap(await axiosClient.post('/auth/login', credentials, { withCredentials: true })),
  register: async (payload) => unwrap(await axiosClient.post('/auth/register', payload, { withCredentials: true })),
  logout: async () => unwrap(await axiosClient.post('/auth/logout', {}, { withCredentials: true })),
  refreshToken: async () => unwrap(await axiosClient.post('/auth/refresh', {}, { withCredentials: true })),
  forgotPassword: async (payload) => unwrap(await axiosClient.post('/auth/forgot-password', payload)),
  resetPassword: async (payload) => unwrap(await axiosClient.post('/auth/reset-password', payload)),
}

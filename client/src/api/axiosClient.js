import axios from 'axios'

import { env } from '@/config/env'
import { tokenStorage } from '@/services/tokenStorage'

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

const refreshClient = axios.create({ baseURL: env.apiBaseUrl, timeout: 15_000 })

let interceptorsConfigured = false
let refreshPromise = null

export function setupAxiosInterceptors(store, authActions) {
  if (interceptorsConfigured) return
  interceptorsConfigured = true

  axiosClient.interceptors.request.use((config) => {
    const accessToken = tokenStorage.getAccessToken()
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const isUnauthorized = error.response?.status === 401
      const isAuthRequest = originalRequest?.url?.includes('/auth/')

      if (!isUnauthorized || originalRequest?._retry || isAuthRequest) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        refreshPromise ??= refreshClient.post('/auth/refresh', {}, { withCredentials: true })
        const response = await refreshPromise
        const payload = response.data?.data ?? response.data
        const accessToken = payload.accessToken ?? payload.token

        if (!accessToken) throw new Error('Refresh response did not include an access token.')

        store.dispatch(authActions.setCredentials({ accessToken, user: payload.user }))
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosClient(originalRequest)
      } catch (refreshError) {
        store.dispatch(authActions.clearCredentials())
        return Promise.reject(refreshError)
      } finally {
        refreshPromise = null
      }
    },
  )
}

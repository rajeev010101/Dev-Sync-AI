import { STORAGE_KEYS } from '@/constants/storageKeys'

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.accessToken),
  setAccessToken: (accessToken) => {
    if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken)
  },
  clearAccessToken: () => localStorage.removeItem(STORAGE_KEYS.accessToken),
}

export const env = Object.freeze({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1',
  socketUrl: import.meta.env.VITE_SOCKET_URL ?? window.location.origin,
})

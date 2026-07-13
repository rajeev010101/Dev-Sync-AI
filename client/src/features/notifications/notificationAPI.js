import { axiosClient } from '@/api/axiosClient'

export const notificationAPI = {
  getNotifications: async () => (await axiosClient.get('/notifications')).data,
  getUnreadCount: async () => (await axiosClient.get('/notifications/unread-count')).data,
  markAsRead: async (notificationId) => (await axiosClient.patch(`/notifications/${notificationId}/read`)).data,
  markAllRead: async () => (await axiosClient.patch('/notifications/mark-all-read')).data,
  deleteNotification: async (notificationId) => (await axiosClient.delete(`/notifications/${notificationId}`)).data,
}

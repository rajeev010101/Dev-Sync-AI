import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { selectCurrentUser } from '@/features/auth/authSelectors'
import { useSocket } from '@/hooks/useSocket'

export function NotificationRealtimeBridge() {
  const socket = useSocket()
  const queryClient = useQueryClient()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (!socket || !currentUser?._id) return undefined

    const syncIncomingNotification = (notification) => {
      queryClient.setQueryData(['notifications'], (previous = []) => {
        const next = Array.isArray(previous) ? [...previous] : []
        const existingIndex = next.findIndex((item) => item._id === notification._id)

        if (existingIndex >= 0) {
          next[existingIndex] = notification
        } else {
          next.unshift(notification)
        }

        return next
      })

      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })

      toast.success(notification.title || 'New notification', {
        description: notification.message,
        duration: 4000,
      })
    }

    socket.emit('join-user', currentUser._id)
    socket.on('notification:new', syncIncomingNotification)
    socket.on('notification:broadcast', syncIncomingNotification)

    return () => {
      socket.off('notification:new', syncIncomingNotification)
      socket.off('notification:broadcast', syncIncomingNotification)
    }
  }, [currentUser?._id, queryClient, socket])

  return null
}

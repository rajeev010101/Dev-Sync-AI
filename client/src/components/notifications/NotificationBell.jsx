import { useQuery } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentUser } from '@/features/auth/authSelectors'
import { notificationAPI } from '@/features/notifications/notificationAPI'
import { selectNotificationDrawerOpen, setDrawerOpen } from '@/features/notifications/notificationSlice'

export function NotificationBell() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const drawerOpen = useSelector(selectNotificationDrawerOpen)

  const unreadCountQuery = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationAPI.getUnreadCount,
    enabled: Boolean(user?._id),
    retry: false,
    staleTime: 15_000,
  })

  const unreadCount = unreadCountQuery.data?.count ?? 0

  return (
    <button
      className="relative rounded-lg p-2 transition-colors hover:bg-muted"
      type="button"
      aria-label="Notifications"
      onClick={() => dispatch(setDrawerOpen(!drawerOpen))}
    >
      <Bell className="size-5" />
      {unreadCount > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      ) : null}
    </button>
  )
}

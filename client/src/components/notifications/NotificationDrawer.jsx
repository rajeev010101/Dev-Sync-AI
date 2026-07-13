import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNowStrict } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCheck, Clock3, Filter, Loader2, Search, Trash2, X } from 'lucide-react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentUser } from '@/features/auth/authSelectors'
import { notificationAPI } from '@/features/notifications/notificationAPI'
import {
  selectNotificationDrawerOpen,
  selectNotificationSearchTerm,
  selectNotificationStatusFilter,
  selectNotificationTypeFilter,
  setDrawerOpen,
  setSearchTerm,
  setStatusFilter,
  setTypeFilter,
} from '@/features/notifications/notificationSlice'
import { cn } from '@/utils/cn'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
]

const TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'system', label: 'System' },
  { value: 'billing', label: 'Billing' },
  { value: 'ai', label: 'AI' },
  { value: 'upload', label: 'Upload' },
  { value: 'admin', label: 'Admin' },
]

function NotificationItem({ notification, onMarkRead, onDelete }) {
  const unread = !notification.read

  return (
    <div className="rounded-2xl border bg-background p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={cn('mt-1 size-2.5 rounded-full', unread ? 'bg-primary' : 'bg-slate-300')} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{notification.title}</h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-slate-600 dark:text-slate-300">
              {notification.type ?? 'system'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{notification.message}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-3.5" />
              {formatDistanceToNowStrict(new Date(notification.createdAt), { addSuffix: true })}
            </span>
            <span className={cn('inline-flex items-center gap-1', unread ? 'text-primary' : 'text-slate-500')}>
              {unread ? 'Unread' : 'Read'}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!notification.read ? (
            <button
              className="rounded-md border bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-muted"
              type="button"
              onClick={() => onMarkRead(notification._id)}
            >
              Mark read
            </button>
          ) : null}
          <button
            className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
            type="button"
            onClick={() => onDelete(notification._id)}
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function NotificationDrawer() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const user = useSelector(selectCurrentUser)
  const drawerOpen = useSelector(selectNotificationDrawerOpen)
  const searchTerm = useSelector(selectNotificationSearchTerm)
  const statusFilter = useSelector(selectNotificationStatusFilter)
  const typeFilter = useSelector(selectNotificationTypeFilter)

  const notificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationAPI.getNotifications,
    enabled: Boolean(user?._id),
    retry: false,
  })

  const markReadMutation = useMutation({
    mutationFn: notificationAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
    },
  })

  const markAllReadMutation = useMutation({
    mutationFn: notificationAPI.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: notificationAPI.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
    },
  })

  const notifications = notificationsQuery.data ?? []
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return notifications.filter((notification) => {
      const matchesSearch =
        !normalizedSearch ||
        [notification.title, notification.message, notification.type].some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch))

      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'unread' ? !notification.read : notification.read)

      const matchesType = typeFilter === 'all' || notification.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [notifications, searchTerm, statusFilter, typeFilter])

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <>
          <motion.button
            className="fixed inset-0 z-40 bg-slate-950/30"
            type="button"
            aria-label="Close notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setDrawerOpen(false))}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l bg-background shadow-2xl"
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h2 className="text-base font-semibold">Notifications</h2>
                <p className="text-xs text-slate-500">{unreadCount} unread</p>
              </div>
              <button className="rounded-md p-2 hover:bg-muted" type="button" aria-label="Close notifications" onClick={() => dispatch(setDrawerOpen(false))}>
                <X className="size-4" />
              </button>
            </div>

            <div className="border-b px-4 py-3">
              <div className="flex gap-2">
                <label className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="w-full rounded-lg border bg-muted/30 py-2 pl-9 pr-3 text-sm outline-none ring-primary focus:ring-2"
                    type="search"
                    placeholder="Search notifications"
                    value={searchTerm}
                    onChange={(event) => dispatch(setSearchTerm(event.target.value))}
                  />
                </label>
                <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 text-sm">
                  <Filter className="size-4 text-slate-500" />
                  <select className="bg-transparent py-2 outline-none" value={statusFilter} onChange={(event) => dispatch(setStatusFilter(event.target.value))}>
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-2">
                <select className="w-full rounded-lg border bg-muted/30 px-3 py-2 text-sm outline-none" value={typeFilter} onChange={(event) => dispatch(setTypeFilter(event.target.value))}>
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between border-b px-4 py-3 text-sm">
              <span className="font-medium">Active feed</span>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                disabled={unreadCount === 0 || markAllReadMutation.isPending}
                onClick={() => markAllReadMutation.mutate()}
              >
                <CheckCheck className="size-4" />
                Mark all read
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {notificationsQuery.isLoading ? (
                <div className="flex items-center gap-2 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-500">
                  <Loader2 className="size-4 animate-spin" />
                  Loading notifications…
                </div>
              ) : null}

              {notificationsQuery.isError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Unable to load notifications.
                  <button className="mt-3 block rounded-md bg-white px-3 py-2 font-medium shadow-sm ring-1 ring-red-200" type="button" onClick={() => notificationsQuery.refetch()}>
                    Retry
                  </button>
                </div>
              ) : null}

              {!notificationsQuery.isLoading && !notificationsQuery.isError && filteredNotifications.length === 0 ? (
                <div className="rounded-2xl border border-dashed bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No notifications match the current view.
                </div>
              ) : null}

              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onDelete={(notificationId) => deleteMutation.mutate(notificationId)}
                  onMarkRead={(notificationId) => markReadMutation.mutate(notificationId)}
                />
              ))}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

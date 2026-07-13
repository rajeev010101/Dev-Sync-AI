import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { SocketProvider } from '@/app/providers/SocketProvider'
import { queryClient } from '@/app/queryClient'
import { store } from '@/app/store'
import { setupAxiosInterceptors } from '@/api/axiosClient'
import { clearCredentials, setCredentials } from '@/features/auth/authSlice'
import { NotificationRealtimeBridge } from '@/components/notifications/NotificationRealtimeBridge'

setupAxiosInterceptors(store, { clearCredentials, setCredentials })

export function AppProviders({ children }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SocketProvider>
            <NotificationRealtimeBridge />
            {children}
            <Toaster richColors closeButton position="top-right" />
          </SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'

import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { SocketProvider } from '@/app/providers/SocketProvider'
import { queryClient } from '@/app/queryClient'
import { store } from '@/app/store'
import { setupAxiosInterceptors } from '@/api/axiosClient'
import { clearCredentials, setCredentials } from '@/features/auth/authSlice'

setupAxiosInterceptors(store, { clearCredentials, setCredentials })

export function AppProviders({ children }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SocketProvider>{children}</SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

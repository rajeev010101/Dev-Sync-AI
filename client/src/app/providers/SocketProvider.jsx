import { createContext, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import { selectAccessToken } from '@/features/auth/authSelectors'
import { createSocket } from '@/socket/socketClient'

export const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const accessToken = useSelector(selectAccessToken)
  const socketRef = useRef(null)

  useEffect(() => {
    if (!accessToken) return undefined
    const socket = createSocket(accessToken)
    socket.connect()
    socketRef.current = socket
    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [accessToken])

  const value = useMemo(() => ({ socket: socketRef.current }), [accessToken])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

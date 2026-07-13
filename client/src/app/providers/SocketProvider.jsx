import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectAccessToken } from '@/features/auth/authSelectors'
import { createSocket } from '@/socket/socketClient'

export const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const accessToken = useSelector(selectAccessToken)
  const socketRef = useRef(null)
  const [socketState, setSocketState] = useState(null)

  useEffect(() => {
    if (!accessToken) {
      socketRef.current?.disconnect()
      socketRef.current = null
      setSocketState(null)
      return undefined
    }

    const socket = createSocket(accessToken)
    socket.connect()
    socketRef.current = socket
    setSocketState(socket)

    return () => {
      socket.disconnect()
      socketRef.current = null
      setSocketState(null)
    }
  }, [accessToken])

  const value = useMemo(() => ({ socket: socketState }), [socketState])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

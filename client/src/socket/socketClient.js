import { io } from 'socket.io-client'

import { env } from '@/config/env'

export function createSocket(accessToken) {
  return io(env.socketUrl, {
    autoConnect: false,
    auth: { token: accessToken },
    transports: ['websocket', 'polling'],
  })
}

import { axiosClient } from '@/api/axiosClient'
import { env } from '@/config/env'
import { tokenStorage } from '@/services/tokenStorage'

export const aiAPI = {
  createChat: async (title) => (await axiosClient.post('/ai/chat/create', { title })).data,
  getChats: async () => (await axiosClient.get('/ai/chats')).data,
  getMessages: async (chatId) => (await axiosClient.get(`/ai/chat/${chatId}/messages`)).data,
  renameChat: async ({ chatId, title }) => (await axiosClient.patch(`/ai/chat/${chatId}`, { title })).data,
  deleteChat: async (chatId) => axiosClient.delete(`/ai/chat/${chatId}`),
  getUsage: async () => (await axiosClient.get('/ai/usage')).data,
}

export async function streamMessage({ chatId, message, onChunk }) {
  const response = await fetch(`${env.apiBaseUrl}/ai/stream`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenStorage.getAccessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  })

  if (!response.ok || !response.body) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message ?? 'Unable to stream the AI response.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let completedResponse = null

  while (true) {
    const { done, value } = await reader.read()
    buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done })
    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''
    for (const event of events) {
      const line = event.split('\n').find((entry) => entry.startsWith('data: '))
      if (!line) continue
      const payload = JSON.parse(line.slice(6))
      if (payload.type === 'chunk') onChunk(payload.text)
      if (payload.type === 'done') completedResponse = payload
    }
    if (done) break
  }

  return completedResponse
}

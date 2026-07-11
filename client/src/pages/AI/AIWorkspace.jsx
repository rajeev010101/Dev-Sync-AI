import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatComposer } from '@/components/ai/ChatComposer'
import { ChatMessage } from '@/components/ai/ChatMessage'
import { ConversationSidebar } from '@/components/ai/ConversationSidebar'
import { UsageSummary } from '@/components/ai/UsageSummary'
import { aiAPI, streamMessage } from '@/features/ai/aiAPI'
import { selectActiveChatId, setActiveChat } from '@/features/ai/aiSlice'

const chatKey = (chatId) => ['ai', 'messages', chatId]

export function AIWorkspace() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const activeChatId = useSelector(selectActiveChatId)
  const [streamError, setStreamError] = useState(null)
  const [retryMessage, setRetryMessage] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [lastResponseUsage, setLastResponseUsage] = useState(null)
  const bottomRef = useRef(null)

  const chatsQuery = useQuery({
    queryKey: ['ai', 'chats'],
    queryFn: aiAPI.getChats,
    retry: false,
  })

  const messagesQuery = useQuery({
    queryKey: chatKey(activeChatId),
    queryFn: () => aiAPI.getMessages(activeChatId),
    enabled: Boolean(activeChatId),
    retry: false,
  })

  const usageQuery = useQuery({
    queryKey: ['ai', 'usage'],
    queryFn: aiAPI.getUsage,
    retry: false,
  })

  useEffect(() => {
    if (!activeChatId && chatsQuery.data?.[0]) dispatch(setActiveChat(chatsQuery.data[0]._id))
  }, [activeChatId, chatsQuery.data, dispatch])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messagesQuery.data, isStreaming])

  const renameMutation = useMutation({ mutationFn: aiAPI.renameChat, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai', 'chats'] }) })
  const deleteMutation = useMutation({
    mutationFn: aiAPI.deleteChat,
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'chats'] })
      queryClient.removeQueries({ queryKey: chatKey(chatId) })
      if (activeChatId === chatId) dispatch(setActiveChat(null))
    },
  })

  const sendMessage = async (content) => {
    setStreamError(null)
    setRetryMessage(null)
    setIsStreaming(true)
    let chatId = activeChatId

    try {
      if (!chatId) {
        const chat = await aiAPI.createChat(content.slice(0, 60) || 'New conversation')
        chatId = chat._id
        dispatch(setActiveChat(chatId))
        queryClient.setQueryData(['ai', 'chats'], (previous = []) => [chat, ...previous])
        queryClient.setQueryData(chatKey(chatId), [])
      }

      const userMessage = { _id: `optimistic-user-${Date.now()}`, role: 'user', content }
      const assistantMessage = { _id: `optimistic-assistant-${Date.now()}`, role: 'assistant', content: '' }
      queryClient.setQueryData(chatKey(chatId), (previous = []) => [...previous, userMessage, assistantMessage])

      const result = await streamMessage({
        chatId,
        message: content,
        onChunk: (text) =>
          queryClient.setQueryData(chatKey(chatId), (previous = []) =>
            previous.map((message) =>
              message._id === assistantMessage._id ? { ...message, content: message.content + text } : message,
            ),
          ),
      })

      setLastResponseUsage(result?.usage ?? null)
      queryClient.invalidateQueries({ queryKey: chatKey(chatId) })
      queryClient.invalidateQueries({ queryKey: ['ai', 'chats'] })
      queryClient.invalidateQueries({ queryKey: ['ai', 'usage'] })
      if (!result) throw new Error('The stream ended without a completed response.')
    } catch (error) {
      setStreamError(error.message ?? 'Unable to send the message.')
      setRetryMessage(content)
      if (chatId) queryClient.invalidateQueries({ queryKey: chatKey(chatId) })
    } finally {
      setIsStreaming(false)
    }
  }

  const messages = messagesQuery.data ?? []
  const hasChats = Boolean(chatsQuery.data?.length)

  return (
    <section className="-m-4 flex h-[calc(100dvh-4rem)] min-h-0 sm:-m-6">
      <ConversationSidebar
        activeChatId={activeChatId}
        chats={chatsQuery.data}
        isLoading={chatsQuery.isLoading}
        onCreate={() => dispatch(setActiveChat(null))}
        onDelete={deleteMutation.mutate}
        onRename={renameMutation.mutate}
        onSelect={(chatId) => dispatch(setActiveChat(chatId))}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-col gap-3 border-b px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-semibold">AI Workspace</h1>
              {activeChatId ? (
                <span className="rounded-full bg-muted px-2 py-1 text-xs text-slate-600">Active chat</span>
              ) : null}
              {lastResponseUsage?.model ? (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{lastResponseUsage.model}</span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-slate-500">Streaming conversations, markdown answers, and usage tracking are available through the existing backend AI endpoints.</p>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <UsageSummary usage={usageQuery.data} />
            {lastResponseUsage ? (
              <p className="text-xs text-slate-500">
                Last response: {lastResponseUsage.totalTokens.toLocaleString()} tokens · ${lastResponseUsage.cost.toFixed(4)}
              </p>
            ) : null}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
            {!hasChats && !chatsQuery.isLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white">
                  <Sparkles className="size-6" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">Start your first conversation</h2>
                <p className="mt-2 text-sm text-slate-500">Create a conversation and send a message to begin.</p>
              </div>
            ) : null}

            {chatsQuery.isError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                <p>Unable to load conversations.</p>
                <button className="mt-3 inline-flex rounded-md bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm ring-1 ring-red-200 hover:bg-red-100" type="button" onClick={() => chatsQuery.refetch()}>
                  Retry
                </button>
              </div>
            ) : null}

            {messagesQuery.isError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                <p>Unable to load messages.</p>
                <button className="mt-3 inline-flex rounded-md bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm ring-1 ring-red-200 hover:bg-red-100" type="button" onClick={() => messagesQuery.refetch()}>
                  Retry
                </button>
              </div>
            ) : null}

            {messagesQuery.isLoading && activeChatId ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Loading conversation…
              </div>
            ) : null}

            {!activeChatId && hasChats ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Select a conversation from the sidebar or create a new one.
              </div>
            ) : null}

            {messages.map((message) => (
              <ChatMessage key={message._id} message={message} />
            ))}

            {streamError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="size-4" />
                    {streamError}
                  </span>
                  {retryMessage ? (
                    <button className="inline-flex rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200" type="button" onClick={() => sendMessage(retryMessage)}>
                      <RefreshCw className="size-4" /> Retry
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} />
          </div>
        </div>

        <ChatComposer disabled={isStreaming} isStreaming={isStreaming} onSend={sendMessage} />
      </div>
    </section>
  )
}

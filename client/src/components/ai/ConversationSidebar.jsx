import { Check, MessageSquare, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utils/cn'

export function ConversationSidebar({ activeChatId, chats, isLoading, onCreate, onDelete, onRename, onSelect }) {
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const beginEdit = (chat) => { setEditingId(chat._id); setTitle(chat.title) }
  const saveEdit = (chatId) => { if (title.trim()) onRename({ chatId, title: title.trim() }); setEditingId(null) }

  return <aside className="flex w-full shrink-0 flex-col border-b bg-muted/20 md:w-72 md:border-b-0 md:border-r"><div className="flex items-center justify-between p-3"><h2 className="text-sm font-semibold">Conversations</h2><button className="rounded-md p-2 hover:bg-muted" type="button" aria-label="New conversation" onClick={onCreate}><Plus className="size-4" /></button></div><div className="max-h-44 space-y-1 overflow-y-auto px-2 pb-3 md:max-h-none md:flex-1">{isLoading && <p className="p-2 text-sm text-slate-500">Loading conversations…</p>}{chats?.map((chat) => <div className={cn('group flex items-center gap-2 rounded-md p-2 text-sm', activeChatId === chat._id ? 'bg-primary text-white' : 'hover:bg-muted')} key={chat._id}>{editingId === chat._id ? <><input autoFocus className="min-w-0 flex-1 rounded bg-background px-2 py-1 text-foreground" value={title} onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') saveEdit(chat._id); if (event.key === 'Escape') setEditingId(null) }} /><button type="button" aria-label="Save name" onClick={() => saveEdit(chat._id)}><Check className="size-4" /></button><button type="button" aria-label="Cancel rename" onClick={() => setEditingId(null)}><X className="size-4" /></button></> : <><button className="flex min-w-0 flex-1 items-center gap-2 text-left" type="button" onClick={() => onSelect(chat._id)}><MessageSquare className="size-4 shrink-0" /><span className="truncate">{chat.title}</span></button><button className="hidden rounded p-1 group-hover:block hover:bg-black/10" type="button" aria-label={`Rename ${chat.title}`} onClick={() => beginEdit(chat)}><Pencil className="size-3.5" /></button><button className="hidden rounded p-1 group-hover:block hover:bg-black/10" type="button" aria-label={`Delete ${chat.title}`} onClick={() => onDelete(chat._id)}><Trash2 className="size-3.5" /></button></>}</div>)}</div></aside>
}

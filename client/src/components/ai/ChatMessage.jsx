import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant'
  return <article className={`flex gap-3 ${isAssistant ? '' : 'justify-end'}`}><div className={`grid size-8 shrink-0 place-items-center rounded-full ${isAssistant ? 'bg-primary text-white' : 'order-2 bg-muted'}`}>{isAssistant ? <Bot className="size-4" /> : <User className="size-4" />}</div><div className={`min-w-0 max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${isAssistant ? 'bg-muted/50' : 'bg-primary text-white'}`}>{isAssistant ? <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{message.content}</ReactMarkdown> : <p className="whitespace-pre-wrap">{message.content}</p>}</div></article>
}

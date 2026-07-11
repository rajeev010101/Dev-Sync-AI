import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const markdownComponents = {
  a: ({ children, ...props }) => (
    <a className="font-medium text-primary underline decoration-primary/50 underline-offset-2" {...props}>
      {children}
    </a>
  ),
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>,
  li: ({ children }) => <li className="leading-6">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-primary/40 pl-3 text-slate-600 dark:text-slate-300">{children}</blockquote>,
  pre: ({ children }) => <pre className="mb-3 overflow-x-auto rounded-2xl bg-slate-950 p-3 text-[13px] text-slate-100">{children}</pre>,
  code: ({ className, children, ...props }) => (
    <code className={className ?? 'rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[0.9em] text-slate-900 dark:bg-slate-800 dark:text-slate-100'} {...props}>
      {String(children).replace(/\n$/, '')}
    </code>
  ),
}

export function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <article className={`flex gap-3 ${isAssistant ? '' : 'justify-end'}`}>
      <div className={`grid size-8 shrink-0 place-items-center rounded-full ${isAssistant ? 'bg-primary text-white' : 'order-2 bg-muted'}`}>
        {isAssistant ? <Bot className="size-4" /> : <User className="size-4" />}
      </div>

      <div className={`min-w-0 max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${isAssistant ? 'bg-muted/50 text-foreground' : 'bg-primary text-white'}`}>
        {isAssistant ? (
          <div className="markdown-content">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </article>
  )
}

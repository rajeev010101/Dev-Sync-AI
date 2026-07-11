import { ArrowUp, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function ChatComposer({ disabled, isStreaming, onSend }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`
  }, [message])

  const submit = (event) => {
    event.preventDefault()
    const content = message.trim()
    if (!content || disabled) return

    setMessage('')
    onSend(content)
  }

  return (
    <form className="border-t bg-background p-3 sm:p-4" onSubmit={submit}>
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border bg-muted/20 p-2">
        <textarea
          ref={textareaRef}
          className="max-h-48 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
          value={message}
          disabled={disabled}
          aria-label="Message DevSync AI"
          placeholder="Message DevSync AI"
          rows={1}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) submit(event)
          }}
        />
        <button className="grid size-9 place-items-center rounded-lg bg-primary text-white disabled:opacity-50" disabled={disabled || !message.trim()} type="submit" aria-label="Send message">
          {isStreaming ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-slate-500">AI can make mistakes. Verify important information.</p>
    </form>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { SendIcon } from 'lucide-react'
import type { Message as ChatMessage } from '@repo/db'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Message, MessageContent } from '@/components/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'

export function Chat({ initial }: { initial: ChatMessage[] }) {
  const [msgs, setMsgs] = useState(initial)
  const socket = useRef<WebSocket>(null)

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL ?? `ws://${location.hostname}:3001`)
    ws.onmessage = (e) => setMsgs((m) => [...m, JSON.parse(e.data)])
    socket.current = ws
    return () => ws.close()
  }, [])

  function send(form: FormData) {
    if (socket.current?.readyState === WebSocket.OPEN) socket.current.send(String(form.get('text')))
  }

  return (
    <main className="flex h-dvh flex-col gap-4 py-8">
      <MessageScrollerProvider autoScroll>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {msgs.map((m) => (
                <MessageScrollerItem key={m.id} messageId={String(m.id)}>
                  <Message>
                    <MessageContent>
                      <Bubble variant="muted">
                        <BubbleContent>{m.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <form action={send}>
        <InputGroup>
          <InputGroupInput name="text" required autoComplete="off" placeholder="Mensagem" aria-label="Mensagem" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit" size="icon-xs" aria-label="Enviar">
              <SendIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </main>
  )
}

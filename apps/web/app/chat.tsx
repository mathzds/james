'use client'

import { useEffect, useRef, useState } from 'react'
import type { Message } from '@repo/db'

export function Chat({ initial }: { initial: Message[] }) {
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
    <main>
      <ul>{msgs.map((m) => <li key={m.id}>{m.text}</li>)}</ul>
      <form action={send}>
        <input name="text" required autoComplete="off" aria-label="Mensagem" />
        <button>Enviar</button>
      </form>
    </main>
  )
}

import { WebSocket, WebSocketServer } from 'ws'
import { db, messages } from '@repo/db'

const port = Number(process.env.PORT ?? 3001)
const wss = new WebSocketServer({ port, maxPayload: 4096 })

wss.on('connection', (socket) => {
  socket.on('message', async (data) => {
    const text = data.toString().trim().slice(0, 500)
    if (!text) return
    try {
      const [msg] = await db.insert(messages).values({ text }).returning()
      const payload = JSON.stringify(msg)
      for (const client of wss.clients) if (client.readyState === WebSocket.OPEN) client.send(payload)
    } catch (err) {
      console.error(err)
    }
  })
})

console.log(`ws listening on :${port}`)

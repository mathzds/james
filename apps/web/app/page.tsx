import { connection } from 'next/server'
import { db, desc, messages } from '@repo/db'
import { Chat } from './chat'

export default async function Page() {
  await connection()
  const rows = await db.select().from(messages).orderBy(desc(messages.id)).limit(50)
  return <Chat initial={rows.reverse()} />
}

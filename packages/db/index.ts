import { drizzle } from 'drizzle-orm/postgres-js'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export * from 'drizzle-orm'

export const messages = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Message = typeof messages.$inferSelect

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/app',
  schema: { messages },
})

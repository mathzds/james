# james

pnpm monorepo: Next.js 16 + Drizzle ORM (Postgres) + WebSocket server (`ws`).

```
apps/web      Next.js (App Router). Page reads DB in a Server Component, client connects to WS.
apps/ws       WebSocket server on :3001. Saves each message via Drizzle and broadcasts it.
packages/db   Drizzle schema + client (`@repo/db`), shared by both apps.
```

## Run

```bash
pnpm install
docker compose up -d   # Postgres on :5432
pnpm db:push           # create tables from the schema
pnpm dev               # web :3000 + ws :3001
```

Env (optional): `DATABASE_URL` (defaults to the compose DB), `NEXT_PUBLIC_WS_URL` (defaults to `ws://<host>:3001`), `PORT` for the ws server.

Schema change: edit `packages/db/index.ts`, run `pnpm db:push`.

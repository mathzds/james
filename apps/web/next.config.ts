import path from 'node:path'
import type { NextConfig } from 'next'

export default {
  // monorepo root; stops Next from picking a stray lockfile higher up
  turbopack: { root: path.join(import.meta.dirname, '../..') },
} satisfies NextConfig

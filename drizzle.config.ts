import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config()

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

export default {
  schema: ['./db/schema/auth.ts', './db/schema/app.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
} satisfies Config

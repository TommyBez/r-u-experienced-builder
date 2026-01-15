import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { headers } from 'next/headers'
import { db } from './db'

const authSecret = process.env.BETTER_AUTH_SECRET

if (!authSecret) {
  throw new Error('BETTER_AUTH_SECRET is not set')
}

export const auth = betterAuth({
  secret: authSecret,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
})

/**
 * Get the current session on the server side.
 * Use this in Server Components and Server Actions.
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

/**
 * Get the current user on the server side.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user ?? null
}

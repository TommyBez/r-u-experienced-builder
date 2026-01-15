import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import {
  property,
  propertyConfiguration,
  propertyConfigurationHistory,
  propertyConfigurationHistoryRelations,
  propertyConfigurationRelations,
  propertyRelations,
} from '../db/schema/app'
import {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} from '../db/schema/auth'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

const sql = neon(databaseUrl)

export const db = drizzle(sql, {
  schema: {
    property,
    propertyConfiguration,
    propertyConfigurationHistory,
    propertyConfigurationHistoryRelations,
    propertyConfigurationRelations,
    propertyRelations,
    user,
    account,
    session,
    accountRelations,
    sessionRelations,
    userRelations,
    verification,
  },
})

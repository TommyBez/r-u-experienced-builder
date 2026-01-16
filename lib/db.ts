import { neonConfig, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import ws from 'ws'
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

// Required for Node.js environments (not needed in edge/browser)
neonConfig.webSocketConstructor = ws

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString: databaseUrl })

export const db = drizzle(pool, {
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

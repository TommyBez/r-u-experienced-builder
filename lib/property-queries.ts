import { and, desc, eq } from 'drizzle-orm'
import {
  property,
  propertyConfiguration,
  propertyConfigurationHistory,
} from '@/db/schema/app'
import { db } from '@/lib/db'

export function listPropertiesForUser(userId: string) {
  return db
    .select({
      id: property.id,
      name: property.name,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      configurationVersion: propertyConfiguration.version,
    })
    .from(property)
    .leftJoin(
      propertyConfiguration,
      eq(propertyConfiguration.propertyId, property.id),
    )
    .where(eq(property.ownerUserId, userId))
    .orderBy(desc(property.updatedAt))
}

export async function getPropertyForUser({
  userId,
  propertyId,
}: {
  userId: string
  propertyId: string
}) {
  const [row] = await db
    .select({
      id: property.id,
      name: property.name,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    })
    .from(property)
    .where(and(eq(property.id, propertyId), eq(property.ownerUserId, userId)))
    .limit(1)

  return row ?? null
}

export async function getCurrentConfiguration({
  userId,
  propertyId,
}: {
  userId: string
  propertyId: string
}) {
  const [row] = await db
    .select({
      propertyId: propertyConfiguration.propertyId,
      configuration: propertyConfiguration.configuration,
      schemaVersion: propertyConfiguration.schemaVersion,
      version: propertyConfiguration.version,
      updatedAt: propertyConfiguration.updatedAt,
    })
    .from(propertyConfiguration)
    .innerJoin(property, eq(property.id, propertyConfiguration.propertyId))
    .where(and(eq(property.id, propertyId), eq(property.ownerUserId, userId)))
    .limit(1)

  return row ?? null
}

export function listConfigurationHistory({
  userId,
  propertyId,
  limit = 20,
}: {
  userId: string
  propertyId: string
  limit?: number
}) {
  return db
    .select({
      id: propertyConfigurationHistory.id,
      propertyId: propertyConfigurationHistory.propertyId,
      version: propertyConfigurationHistory.version,
      schemaVersion: propertyConfigurationHistory.schemaVersion,
      changedAt: propertyConfigurationHistory.changedAt,
    })
    .from(propertyConfigurationHistory)
    .innerJoin(
      property,
      eq(property.id, propertyConfigurationHistory.propertyId),
    )
    .where(and(eq(property.id, propertyId), eq(property.ownerUserId, userId)))
    .orderBy(desc(propertyConfigurationHistory.changedAt))
    .limit(limit)
}

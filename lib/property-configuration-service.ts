import { eq } from 'drizzle-orm'
import {
  property,
  propertyConfiguration,
  propertyConfigurationHistory,
} from '../db/schema/app'
import { db } from './db'
import { validatePropertyConfiguration } from './property-configuration'

interface CreatePropertyInput {
  ownerUserId: string
  name: string
  configuration: unknown
}

interface UpdatePropertyConfigurationInput {
  propertyId: string
  configuration: unknown
}

export const createPropertyWithConfiguration = ({
  ownerUserId,
  name,
  configuration,
}: CreatePropertyInput) => {
  const parsedConfig = validatePropertyConfiguration(configuration)

  return db.transaction(async (tx) => {
    const [createdProperty] = await tx
      .insert(property)
      .values({ ownerUserId, name })
      .returning()

    if (!createdProperty) {
      throw new Error('Failed to create property')
    }

    const schemaVersion = parsedConfig.schemaVersion

    await tx.insert(propertyConfiguration).values({
      propertyId: createdProperty.id,
      schemaVersion,
      configuration: parsedConfig,
      version: 1,
    })

    await tx.insert(propertyConfigurationHistory).values({
      propertyId: createdProperty.id,
      version: 1,
      schemaVersion,
      configuration: parsedConfig,
    })

    return createdProperty
  })
}

export const updatePropertyConfiguration = ({
  propertyId,
  configuration,
}: UpdatePropertyConfigurationInput) => {
  const parsedConfig = validatePropertyConfiguration(configuration)

  return db.transaction(async (tx) => {
    const [current] = await tx
      .select({ version: propertyConfiguration.version })
      .from(propertyConfiguration)
      .where(eq(propertyConfiguration.propertyId, propertyId))

    if (!current) {
      throw new Error('Property configuration not found')
    }

    const nextVersion = current.version + 1
    const schemaVersion = parsedConfig.schemaVersion

    await tx.insert(propertyConfigurationHistory).values({
      propertyId,
      version: nextVersion,
      schemaVersion,
      configuration: parsedConfig,
    })

    const [updatedConfiguration] = await tx
      .update(propertyConfiguration)
      .set({
        configuration: parsedConfig,
        schemaVersion,
        version: nextVersion,
        updatedAt: new Date(),
      })
      .where(eq(propertyConfiguration.propertyId, propertyId))
      .returning()

    await tx
      .update(property)
      .set({ updatedAt: new Date() })
      .where(eq(property.id, propertyId))

    return updatedConfiguration
  })
}

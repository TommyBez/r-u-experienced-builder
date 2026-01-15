import { z } from 'zod'

export const propertyConfigurationV1Schema = z
  .object({
    schemaVersion: z.literal(1),
  })
  .passthrough()

export const propertyConfigurationSchema = z.discriminatedUnion(
  'schemaVersion',
  [propertyConfigurationV1Schema],
)

export type PropertyConfiguration = z.infer<typeof propertyConfigurationSchema>

export const validatePropertyConfiguration = (input: unknown) =>
  propertyConfigurationSchema.parse(input)

import { z } from 'zod'

const heroSchema = z.object({
  kicker: z.string(),
  headline: z.string(),
  description: z.string(),
  primaryCta: z.string(),
  secondaryCta: z.string(),
})

const fontSchema = z.object({
  sans: z.string(),
  serif: z.string(),
})

const paletteSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  primary: z.string(),
  primaryForeground: z.string(),
  secondary: z.string(),
  secondaryForeground: z.string(),
  muted: z.string(),
  mutedForeground: z.string(),
  accent: z.string(),
  accentForeground: z.string(),
  border: z.string(),
  ring: z.string(),
})

const paletteGroupSchema = z.object({
  light: paletteSchema,
  dark: paletteSchema,
})

export const propertyConfigurationV1Schema = z
  .object({
    schemaVersion: z.literal(1),
    hero: heroSchema,
    fonts: fontSchema,
    palette: paletteGroupSchema,
  })
  .passthrough()

export const propertyConfigurationSchema = z.discriminatedUnion(
  'schemaVersion',
  [propertyConfigurationV1Schema],
)

export type PropertyConfiguration = z.infer<typeof propertyConfigurationSchema>

export const validatePropertyConfiguration = (input: unknown) =>
  propertyConfigurationSchema.parse(input)

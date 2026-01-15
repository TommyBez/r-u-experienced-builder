import { NextResponse } from 'next/server'
import { z } from 'zod'
import { buildTemplateFiles, getTemplatePath } from '@/lib/template-builder'
import type { BuilderConfig } from '@/lib/template-patchers'
import { type DeploymentFiles, deployAndAlias } from '@/lib/vercel'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes for deployment

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

const deployRequestSchema = z.object({
  siteName: z
    .string()
    .min(1, 'Site name is required')
    .refine(
      (name) => {
        const slug = name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
        return slug.length >= 3 && slug.length <= 63
      },
      {
        message:
          'Site name must be at least 3 characters and at most 63 characters after slugification',
      },
    ),
  hero: z.object({
    kicker: z.string(),
    headline: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
  fonts: z.object({
    sans: z.string(),
    serif: z.string(),
  }),
  palette: z.object({
    light: paletteSchema,
    dark: paletteSchema,
  }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request with Zod
    const validationResult = deployRequestSchema.safeParse(body)
    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ') || 'Invalid request body'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { siteName, hero, fonts, palette } = validationResult.data

    // Slugify site name
    const slug = siteName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // Build the template files with patches applied
    const templatePath = getTemplatePath()
    const builderConfig: Omit<BuilderConfig, 'siteName'> = {
      hero,
      fonts,
      palette,
    }

    const files = buildTemplateFiles(templatePath, builderConfig)

    // Convert to Vercel deployment format
    const vercelFiles: DeploymentFiles = files.map((f) => ({
      file: f.file,
      data: f.data ?? '',
      encoding: f.encoding,
    }))

    // Deploy to Vercel
    const result = await deployAndAlias({
      files: vercelFiles,
      name: slug,
      teamId: process.env.VERCEL_TEAM_ID,
    })

    return NextResponse.json({
      success: true,
      deploymentUrl: result.deploymentUrl,
      deploymentId: result.deploymentId,
    })
  } catch (error) {
    console.error('Deploy error:', error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      { error: `Deployment failed: ${message}` },
      { status: 500 },
    )
  }
}

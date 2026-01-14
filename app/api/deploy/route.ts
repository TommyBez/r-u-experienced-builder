import { NextResponse } from 'next/server'
import { buildTemplateFiles, getTemplatePath } from '@/lib/template-builder'
import type { BuilderConfig } from '@/lib/template-patchers'
import { type DeploymentFiles, deployAndAlias } from '@/lib/vercel'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes for deployment

interface DeployRequest {
  siteName: string
  hero: {
    kicker: string
    headline: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
  fonts: {
    sans: string
    serif: string
  }
  palette: {
    light: {
      background: string
      foreground: string
      primary: string
      primaryForeground: string
      secondary: string
      secondaryForeground: string
      muted: string
      mutedForeground: string
      accent: string
      accentForeground: string
      border: string
      ring: string
    }
    dark: {
      background: string
      foreground: string
      primary: string
      primaryForeground: string
      secondary: string
      secondaryForeground: string
      muted: string
      mutedForeground: string
      accent: string
      accentForeground: string
      border: string
      ring: string
    }
  }
}

/**
 * Validate and slugify site name
 */
function validateSiteName(name: string): {
  valid: boolean
  slug: string
  error?: string
} {
  if (!name || typeof name !== 'string') {
    return { valid: false, slug: '', error: 'Site name is required' }
  }

  // Slugify: lowercase, replace spaces with hyphens, remove special chars
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (slug.length < 3) {
    return {
      valid: false,
      slug,
      error: 'Site name must be at least 3 characters',
    }
  }

  if (slug.length > 63) {
    return {
      valid: false,
      slug,
      error: 'Site name must be at most 63 characters',
    }
  }

  return { valid: true, slug }
}

/**
 * Basic validation for deploy request
 */
function validateRequest(body: unknown): {
  valid: boolean
  error?: string
  data?: DeployRequest
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const req = body as Record<string, unknown>

  // Check required fields
  if (!req.siteName) {
    return { valid: false, error: 'siteName is required' }
  }

  if (!req.hero || typeof req.hero !== 'object') {
    return { valid: false, error: 'hero config is required' }
  }

  if (!req.fonts || typeof req.fonts !== 'object') {
    return { valid: false, error: 'fonts config is required' }
  }

  if (!req.palette || typeof req.palette !== 'object') {
    return { valid: false, error: 'palette config is required' }
  }

  // Type assertion after validation
  return { valid: true, data: body as DeployRequest }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request
    const validation = validateRequest(body)
    if (!(validation.valid && validation.data)) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { siteName, hero, fonts, palette } = validation.data

    // Validate and slugify site name
    const siteNameValidation = validateSiteName(siteName)
    if (!siteNameValidation.valid) {
      return NextResponse.json(
        { error: siteNameValidation.error },
        { status: 400 },
      )
    }

    const slug = siteNameValidation.slug

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
      alias: `${slug}.vercel.app`,
      teamId: process.env.VERCEL_TEAM_ID,
    })

    return NextResponse.json({
      success: true,
      url: result.aliasUrl,
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

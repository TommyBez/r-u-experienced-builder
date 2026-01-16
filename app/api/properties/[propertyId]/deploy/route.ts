import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { validatePropertyConfiguration } from '@/lib/property-configuration'
import {
  getCurrentConfiguration,
  getPropertyForUser,
} from '@/lib/property-queries'
import { buildTemplateFiles, getTemplatePath } from '@/lib/template-builder'
import { deployAndAlias } from '@/lib/vercel'

export const runtime = 'nodejs'
export const maxDuration = 300

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function POST(
  _request: Request,
  { params }: { params: { propertyId: string } },
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const [propertyRecord, configurationRecord] = await Promise.all([
      getPropertyForUser({
        userId: session.user.id,
        propertyId: params.propertyId,
      }),
      getCurrentConfiguration({
        userId: session.user.id,
        propertyId: params.propertyId,
      }),
    ])

    if (!propertyRecord) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    if (!configurationRecord) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 },
      )
    }

    const parsed = validatePropertyConfiguration(
      configurationRecord.configuration,
    )
    const { schemaVersion: _schemaVersion, ...builderConfig } = parsed

    const files = buildTemplateFiles(getTemplatePath(), builderConfig)
    const result = await deployAndAlias({
      files: files.map((file) => ({
        file: file.file,
        data: file.data ?? '',
        encoding: file.encoding,
      })),
      name: slugify(propertyRecord.name),
      teamId: process.env.VERCEL_TEAM_ID,
    })

    return NextResponse.json({
      deploymentUrl: result.deploymentUrl,
      deploymentId: result.deploymentId,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Deployment failed: ${message}` },
      { status: 500 },
    )
  }
}

import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { PropertyConfigurationForm } from '@/components/properties/property-configuration-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import { updatePropertyConfiguration } from '@/lib/property-configuration-service'
import {
  getCurrentConfiguration,
  getPropertyForUser,
} from '@/lib/property-queries'

interface ConfigurationState {
  error?: string | null
  success?: boolean
}

export default async function PropertyConfigurationPage({
  params,
}: {
  params: { propertyId: string }
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const [propertyRecord, configuration] = await Promise.all([
    getPropertyForUser({
      userId: user.id,
      propertyId: params.propertyId,
    }),
    getCurrentConfiguration({
      userId: user.id,
      propertyId: params.propertyId,
    }),
  ])

  if (!propertyRecord) {
    notFound()
  }

  const defaultValue = JSON.stringify(
    configuration?.configuration ?? {},
    null,
    2,
  )

  const updateConfigurationAction = async (
    _prevState: ConfigurationState,
    formData: FormData,
  ): Promise<ConfigurationState> => {
    'use server'

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      redirect('/sign-in')
    }

    const property = await getPropertyForUser({
      userId: currentUser.id,
      propertyId: params.propertyId,
    })
    if (!property) {
      return { error: 'Property not found.' }
    }

    const rawConfig = String(formData.get('configuration') || '').trim()
    if (!rawConfig) {
      return { error: 'Configuration cannot be empty.' }
    }

    let parsedConfig: unknown
    try {
      parsedConfig = JSON.parse(rawConfig)
    } catch {
      return { error: 'Configuration must be valid JSON.' }
    }

    try {
      await updatePropertyConfiguration({
        propertyId: params.propertyId,
        configuration: parsedConfig,
      })
      revalidatePath(`/properties/${params.propertyId}`)
      revalidatePath(`/properties/${params.propertyId}/configuration`)
      return { success: true }
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update configuration.',
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl">Configuration</h1>
        <p className="text-muted-foreground text-sm">
          Update the JSON configuration for {propertyRecord.name}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit configuration</CardTitle>
          <CardDescription>
            Paste a configuration object that matches the expected schema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyConfigurationForm
            action={updateConfigurationAction}
            defaultValue={defaultValue}
          />
        </CardContent>
      </Card>

      <Link
        className="text-muted-foreground text-sm underline"
        href={`/properties/${propertyRecord.id}`}
      >
        Back to property
      </Link>
    </div>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PropertyCreateForm } from '@/components/properties/property-create-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import { createPropertyWithConfiguration } from '@/lib/property-configuration-service'
import { getDefaultBuilderConfig } from '@/lib/template-patchers'

interface CreatePropertyState {
  error?: string | null
}

export default function NewPropertyPage() {
  const createPropertyAction = async (
    _prevState: CreatePropertyState,
    formData: FormData,
  ): Promise<CreatePropertyState> => {
    'use server'

    const user = await getCurrentUser()
    if (!user) {
      redirect('/sign-in')
    }

    const name = String(formData.get('name') || '').trim()
    if (!name) {
      return { error: 'Property name is required.' }
    }

    let created: Awaited<ReturnType<typeof createPropertyWithConfiguration>>
    try {
      const baseConfig = getDefaultBuilderConfig()
      const configuration = {
        schemaVersion: 1,
        ...baseConfig,
      }
      created = await createPropertyWithConfiguration({
        ownerUserId: user.id,
        name,
        configuration,
      })
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : 'Failed to create property.',
      }
    }
    redirect(`/properties/${created.id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl">New property</h1>
        <p className="text-muted-foreground text-sm">
          Set up a property and start customizing its configuration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property details</CardTitle>
          <CardDescription>
            Choose a name you can recognize later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyCreateForm action={createPropertyAction} />
        </CardContent>
      </Card>

      <Link
        className="text-muted-foreground text-sm underline"
        href="/properties"
      >
        Back to properties
      </Link>
    </div>
  )
}

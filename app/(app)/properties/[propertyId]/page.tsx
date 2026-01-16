import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { DeployButton } from '@/components/properties/deploy-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import {
  getCurrentConfiguration,
  getPropertyForUser,
} from '@/lib/property-queries'

export default async function PropertyDetailPage({
  params,
}: PageProps<'/properties/[propertyId]'>) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const { propertyId } = await params

  const [propertyRecord, configuration] = await Promise.all([
    getPropertyForUser({
      userId: user.id,
      propertyId,
    }),
    getCurrentConfiguration({
      userId: user.id,
      propertyId,
    }),
  ])

  if (!propertyRecord) {
    notFound()
  }

  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl">{propertyRecord.name}</h1>
          <p className="text-muted-foreground text-sm">
            Updated {dateFormatter.format(new Date(propertyRecord.updatedAt))}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DeployButton propertyId={propertyRecord.id} />
          <Button asChild variant="outline">
            <Link href={`/properties/${propertyRecord.id}/configuration`}>
              Edit configuration
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/properties/${propertyRecord.id}/history`}>
              View history
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property info</CardTitle>
            <CardDescription>
              Basic details about this property.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{propertyRecord.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {dateFormatter.format(new Date(propertyRecord.createdAt))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-medium">
                {dateFormatter.format(new Date(propertyRecord.updatedAt))}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Current configuration snapshot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Schema version</span>
              <span className="font-medium">
                {configuration?.schemaVersion ?? 1}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Config version</span>
              <span className="font-medium">{configuration?.version ?? 1}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last updated</span>
              <span className="font-medium">
                {configuration?.updatedAt
                  ? dateFormatter.format(new Date(configuration.updatedAt))
                  : 'Not available'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

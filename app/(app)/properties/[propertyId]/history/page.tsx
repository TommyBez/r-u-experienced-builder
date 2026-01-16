import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import {
  getPropertyForUser,
  listConfigurationHistory,
} from '@/lib/property-queries'

export default async function PropertyHistoryPage({
  params,
}: {
  params: { propertyId: string }
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const [propertyRecord, history] = await Promise.all([
    getPropertyForUser({
      userId: user.id,
      propertyId: params.propertyId,
    }),
    listConfigurationHistory({
      userId: user.id,
      propertyId: params.propertyId,
      limit: 20,
    }),
  ])

  if (!propertyRecord) {
    notFound()
  }

  const dateFormatter = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl">Configuration history</h1>
        <p className="text-muted-foreground text-sm">
          Recent changes for {propertyRecord.name}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent versions</CardTitle>
          <CardDescription>
            {history.length
              ? `Showing the latest ${history.length} versions.`
              : 'No configuration history yet.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Update your configuration to start tracking history.
            </p>
          ) : (
            history.map((entry) => (
              <div
                className="flex items-center justify-between rounded-lg border p-3 text-sm"
                key={entry.id}
              >
                <div>
                  <p className="font-medium">Version {entry.version}</p>
                  <p className="text-muted-foreground text-xs">
                    {dateFormatter.format(new Date(entry.changedAt))}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs">
                  Schema {entry.schemaVersion}
                </span>
              </div>
            ))
          )}
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

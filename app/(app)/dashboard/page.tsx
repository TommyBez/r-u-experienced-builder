import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth'
import { listPropertiesForUser } from '@/lib/property-queries'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const properties = await listPropertiesForUser(user.id)
  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
  const joinedAt = user.createdAt
    ? dateFormatter.format(new Date(user.createdAt))
    : '—'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-2xl">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Manage your properties and configuration history.
          </p>
        </div>
        <Button asChild>
          <Link href="/properties/new">New property</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Your account at a glance.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Total properties</p>
            <p className="font-semibold text-2xl">{properties.length}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Signed in as</p>
            <p className="font-medium text-sm">{user.email}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Joined</p>
            <p className="font-medium text-sm">{joinedAt}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent properties</CardTitle>
          <CardDescription>Latest updates from your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {properties.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              You do not have any properties yet.
            </p>
          ) : (
            properties.slice(0, 3).map((property) => (
              <Link
                className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-muted/50"
                href={`/properties/${property.id}`}
                key={property.id}
              >
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-muted-foreground text-xs">
                    Updated {dateFormatter.format(new Date(property.updatedAt))}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs">
                  v{property.configurationVersion ?? 1}
                </span>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

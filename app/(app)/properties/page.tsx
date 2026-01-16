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

export default async function PropertiesPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const properties = await listPropertiesForUser(user.id)
  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-2xl">Properties</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage your property configurations.
          </p>
        </div>
        <Button asChild>
          <Link href="/properties/new">New property</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All properties</CardTitle>
          <CardDescription>
            {properties.length
              ? `You have ${properties.length} properties.`
              : 'No properties yet.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {properties.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Get started by creating your first property.
            </p>
          ) : (
            properties.map((property) => (
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

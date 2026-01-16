import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/app/app-shell'
import { getCurrentUser } from '@/lib/auth'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const defaultOpen =
    (await cookies()).get(SIDEBAR_COOKIE_NAME)?.value !== 'false'

  return <AppShell defaultOpen={defaultOpen}>{children}</AppShell>
}

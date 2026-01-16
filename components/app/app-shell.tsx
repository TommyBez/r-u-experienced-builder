'use client'

import Link from 'next/link'
import { AppSidebar } from '@/components/app/app-sidebar'
import { UserButton } from '@/components/auth/user-button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

interface AppShellProps {
  defaultOpen: boolean
  children: React.ReactNode
}

export function AppShell({ defaultOpen, children }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b bg-background/95 px-4 supports-backdrop-filter:bg-background/60">
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-between">
            <Link className="font-semibold" href="/dashboard">
              R U Experienced
            </Link>
            <UserButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

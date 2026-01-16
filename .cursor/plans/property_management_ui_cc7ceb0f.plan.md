---
name: Property management UI
overview: Add an authenticated application area with a sidebar-based layout, plus server-first pages to manage properties and their configurations/history (and optional deploy), built on the existing Drizzle schema and services.
todos:
  - id: app-shell-layout
    content: Create `app/(app)/layout.tsx` (server) + client `components/app/app-shell.tsx` integrating `SidebarProvider` and a shared header area.
    status: completed
  - id: sidebar-nav
    content: Implement `components/app/app-sidebar.tsx` using `components/ui/sidebar.tsx` primitives; add navigation links and active state.
    status: completed
  - id: property-queries
    content: Add server-side query helpers (Drizzle) for listing/fetching properties/config/history scoped to current user.
    status: completed
  - id: properties-pages
    content: Add server-first pages under `app/(app)/properties` for list, create, detail, configuration, history; use server actions for mutations.
    status: completed
  - id: deploy-route
    content: Add `app/api/properties/[propertyId]/deploy/route.ts` and a small client `DeployButton` to trigger deployments from a property.
    status: completed
  - id: config-validation
    content: Align `lib/property-configuration.ts` Zod schema with the stored configuration shape (schemaVersion + builder-relevant fields).
    status: completed
  - id: react-best-practices-review
    content: Perform a React best-practices assessment using the `vercel-react-best-practices` skill (server/client boundaries, hooks usage, composition, accessibility, performance) and apply quick fixes.
    status: completed
isProject: false
---

# Property management pages + sidebar shell

## Goal

Create a dedicated authenticated “app area” (server components by default) to manage the business entities already defined in the DB schema (`property`, `property_configuration`, `property_configuration_history`) and add a persistent application sidebar for navigation based on `components/ui/sidebar.tsx`.

## Assumptions (explicit)

- **Routes**: management UI will live under `/dashboard` + `/properties/...` (implemented via a route group `app/(app)/...`) so it doesn’t affect auth pages in `app/(auth)/...`.
- **Auth gating**: management routes require login; unauthenticated users are redirected to `/sign-in` using `getCurrentUser()` from `lib/auth.ts`.
- **Configuration payload**: `property_configuration.configuration` will store a JSON object containing at least `{ schemaVersion: 1, ... }` to satisfy the DB check constraint in `db/schema/app.ts`. We’ll align the rest of that payload with your existing builder config shape (hero/fonts/palette) so it can be used for deploy.

## App Router structure (layouts + pages)

- **New route group + shared layout**
- Add `[app/(app)/layout.tsx](app/\\\\\(app)/layout.tsx)` as a **Server Component** that:
- calls `getCurrentUser()` and `redirect('/sign-in')` if missing
- reads the sidebar cookie via `cookies()` and passes a `defaultOpen` boolean into the client shell
- renders a client `AppShell` that hosts `SidebarProvider`.

- **Navigation sidebar**
- Add [`components/app/app-shell.tsx`](components/app/app-shell.tsx) (**Client Component**) that composes:
- `SidebarProvider`, `Sidebar`, `SidebarInset`, `SidebarTrigger`
- a top bar area (can reuse `components/header.tsx` or a slimmer internal header)
- `children` as the main content area.
- Add [`components/app/app-sidebar.tsx`](components/app/app-sidebar.tsx) (**Client Component**) that:
- uses `next/link` + `usePathname()` to render active navigation
- uses primitives from `components/ui/sidebar.tsx` (`SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, etc.)
- includes links:
- `/dashboard` (overview)
- `/properties` (list)
- `/` (existing Builder)
- `/profile`, `/settings` (since they’re already linked from `components/auth/user-button.tsx`)

## Data access + server-first fetching

- Add small server-only query helpers (to avoid scattering Drizzle code):
- [`lib/property-queries.ts`](lib/property-queries.ts) (or `lib/property-service.ts`), exporting functions like:
- `listPropertiesForUser(userId)`
- `getPropertyForUser({ userId, propertyId })`
- `getCurrentConfiguration({ userId, propertyId })`
- `listConfigurationHistory({ userId, propertyId, limit })`
- Each page will fetch on the server using `db` from `lib/db.ts` and filter by `ownerUserId`.

## Management pages (Server Components by default)

- **Dashboard**
- `[app/(app)/dashboard/page.tsx](app/\\\\\(app)/dashboard/page.tsx)`: server-rendered overview (e.g., latest properties + quick actions).

- **Properties list + create**
- `[app/(app)/properties/page.tsx](app/\\\\\(app)/properties/page.tsx)`: server list of the current user’s properties.
- `[app/(app)/properties/new/page.tsx](app/\\\\\(app)/properties/new/page.tsx)`: create property form.
- Use a small client form component for interactivity/validation; submit via **Server Action** that calls `createPropertyWithConfiguration` from `lib/property-configuration-service.ts`.
- On success: `redirect('/properties/[id]')`.

- **Property detail**
- `[app/(app)/properties/[propertyId]/page.tsx](app/(app)/properties/[propertyId]/page.tsx)`: server details (name, updatedAt, current config version).

- **Configuration view/edit**
- `[app/(app)/properties/[propertyId]/configuration/page.tsx](app/(app)/properties/[propertyId]/configuration/page.tsx)`:
- server renders current configuration + metadata
- optional client editor (`textarea` JSON) for updates
- update uses **Server Action** calling `updatePropertyConfiguration` from `lib/property-configuration-service.ts`, then `revalidatePath` for the relevant routes.

- **Configuration history**
- `[app/(app)/properties/[propertyId]/history/page.tsx](app/(app)/properties/[propertyId]/history/page.tsx)`: server table listing versions + timestamps; optional “view version” page if needed.

## Deploy integration (side-effect route handler)

- Add `[app/api/properties/[propertyId]/deploy/route.ts](app/api/properties/[propertyId]/deploy/route.ts)` (Node runtime) that:
- checks session via `getSession()` (`lib/auth.ts`)
- loads the property + current configuration from DB (ensuring ownership)
- builds template files via `buildTemplateFiles()` / `getTemplatePath()`
- deploys via `deployAndAlias()` (`lib/vercel.ts`)
- returns `{ deploymentUrl, deploymentId }`
- sets `export const maxDuration = 300` like your existing [`app/api/deploy/route.ts`](app/api/deploy/route.ts).
- Add a small client `DeployButton` used on the property detail page to call this route and show progress.

## Schema validation alignment

- Update [`lib/property-configuration.ts`](lib/property-configuration.ts) so `propertyConfigurationV1Schema` validates the stored shape (at minimum `schemaVersion: 1` plus the builder-relevant fields you want persisted). This keeps DB constraints and runtime validation aligned.

## UX + shared UI best practices

- Keep pages as Server Components; push interactivity into leaf components only (forms, deploy button, JSON editor).
- Use layout files for shared UI:
- `app/(auth)/layout.tsx` remains unchanged for auth pages.
- `app/(app)/layout.tsx` provides the authenticated sidebar shell.

## Notes / small cleanup

- `components/ui/sidebar.tsx` currently writes `sidebar_state` but doesn’t read it; in the app layout we’ll read that cookie on the server and pass `defaultOpen` into `SidebarProvider` so persistence actually works.

## Post-implementation: React best-practices assessment

After the feature is implemented, run a focused review of the new/changed code **using the `vercel-react-best-practices` skill** and address quick wins:

- **Server-first correctness**: verify pages are Server Components by default; only leaf interactive pieces are client components (`'use client'`).
- **Server/client boundary hygiene**: no server-only imports (`next/headers`, `db`, etc.) inside client components; no accidental client bundles of large deps.
- **Hooks correctness**: hooks only in client components; stable dependencies; avoid unnecessary state; prefer derived values.
- **Composition**: keep `AppShell` thin; prefer reusable presentational components for lists/forms.
- **Accessibility**: keyboard nav (sidebar trigger), form labels, button semantics, aria-invalid on inputs, focus styles.
- **Performance**: avoid N+1 DB queries on list/detail pages; use `select` projections; avoid over-fetching history; consider pagination/limits.
- **Error handling**: use `notFound()` for missing/unauthorized `propertyId`; show user-friendly errors for server actions and deploy failures.
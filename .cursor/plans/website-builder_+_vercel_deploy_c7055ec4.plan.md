---
name: Website-builder + Vercel deploy
overview: Turn the current Next.js app into a “website builder” UI that edits hero copy, fonts, and color palette for the `template/` site, then programmatically deploys a modified copy to Vercel (production) and returns a stable `https://<siteName>.vercel.app` URL.
todos:
  - id: template-direct-patching
    content: Refactor template minimally (optional markers) and implement deploy-time patching that directly rewrites existing template files for hero copy, fonts, and palette.
    status: completed
  - id: template-to-vercel-files
    content: Implement template directory -> Vercel `files[]` builder (handles text + binary assets, strips `template/` prefix).
    status: completed
  - id: vercel-prod-deploy
    content: Upgrade `lib/vercel.ts` to create production deployments, poll readiness, and assign stable `siteName.vercel.app` alias.
    status: completed
  - id: deploy-route
    content: Add `/api/deploy` route (node runtime) that validates input, generates injected files, triggers deployment, and returns final URL.
    status: completed
  - id: builder-ui
    content: Replace root `app/page.tsx` with a builder UI (hero copy editor, hybrid font/palette controls, deploy button, result URL + errors).
    status: completed
  - id: smoke-test
    content: "Run end-to-end locally: deploy once, verify URL works and reflects the chosen copy/fonts/palette."
    status: completed
isProject: false
---

# Website builder refactor (template-driven + Vercel production deploy)

## What we’re building

- A builder UI (in the root Next app) where the user edits:
  - **Hero section copy** (kicker, headline, description, CTA labels)
  - **Font pairing** (preset pairs + advanced pick of sans/serif)
  - **Color palette** (preset palettes + optional fine-tuning)
- On **Deploy**, the builder generates a **modified copy of the `template/` app in-memory**, sends it to Vercel via the existing SDK wrapper in [`/Users/tommaso/personal-projects/r-u-experienced-builder/lib/vercel.ts`](/Users/tommaso/personal-projects/r-u-experienced-builder/lib/vercel.ts), waits for readiness, assigns the stable alias `https://<siteName>.vercel.app`, and returns that URL.

## High-level architecture

```mermaid
sequenceDiagram
  participant User as User
  participant BuilderUI as BuilderUI
  participant ApiDeploy as ApiDeployRoute
  participant TemplateGen as TemplateGenerator
  participant VercelApi as VercelSDK

  User->>BuilderUI: Edit copy/fonts/palette + siteName
  BuilderUI->>ApiDeploy: POST /api/deploy (builderConfig)
  ApiDeploy->>TemplateGen: Read template/ + patch existing files
  TemplateGen-->>ApiDeploy: files[] (Vercel deployment payload)
  ApiDeploy->>VercelApi: createDeployment(target=production, name=siteName, files[])
  ApiDeploy->>VercelApi: waitForReady(deploymentId)
  ApiDeploy->>VercelApi: assignAlias(alias=siteName.vercel.app, deploymentId)
  ApiDeploy-->>BuilderUI: { url: https://siteName.vercel.app }
  BuilderUI-->>User: Show URL + open button
```

## Template refactor (minimal) + direct patching strategy

Constraint: **no extra files** and **no font preloading**. So we will patch the existing template files directly at deploy time (in-memory), then send the patched sources to Vercel as `files[]`.

### Files we will rewrite per deployment

- **Hero copy**: [`/Users/tommaso/personal-projects/r-u-experienced-builder/template/components/hero-section.tsx`](/Users/tommaso/personal-projects/r-u-experienced-builder/template/components/hero-section.tsx)\n+  - Replace the literal strings for kicker/headline/paragraph/CTAs.\n+  - To make this robust, we can optionally add small inline markers (comments) in this existing file (still no new files) so the patcher can do deterministic replacements.\n+
- **Fonts (no preloading)**: [`/Users/tommaso/personal-projects/r-u-experienced-builder/template/app/layout.tsx`](/Users/tommaso/personal-projects/r-u-experienced-builder/template/app/layout.tsx)\n+  - Rewrite the `next/font/google` import + font declarations to include **only the selected sans/serif fonts**.\n+  - Keep the same CSS variable names (`--font-sans`, `--font-serif`) so the rest of the template keeps working.\n+
- **Color palette**: [`/Users/tommaso/personal-projects/r-u-experienced-builder/template/app/globals.css`](/Users/tommaso/personal-projects/r-u-experienced-builder/template/app/globals.css)\n+  - Rewrite a targeted subset of CSS custom properties under `:root` and `.dark` (at minimum: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--ring`).\n+  - For “hybrid” UX, presets map to known OKLCH values; fine-tuning allows user overrides for a subset (e.g. primary/accent/background).\n+

This keeps the template unchanged on disk during runtime; the modifications only exist in the deployment payload.

## Builder app changes (root app)

- **Replace** the current demo page with a builder UI:
  - [`/Users/tommaso/personal-projects/r-u-experienced-builder/app/page.tsx`](/Users/tommaso/personal-projects/r-u-experienced-builder/app/page.tsx)
- Add a builder feature folder (suggested):
  - [`/Users/tommaso/personal-projects/r-u-experienced-builder/components/builder/`](/Users/tommaso/personal-projects/r-u-experienced-builder/components/builder/)
  - Includes a form, presets data, and a lightweight preview panel.
- Deploy flow UX:
  - Site name/slug input (validated, slugified)
  - “Deploy” button
  - Loading state + error handling
  - Result card with the returned URL

## Server-side deploy endpoint

- **Create** Next route handler:
  - [`/Users/tommaso/personal-projects/r-u-experienced-builder/app/api/deploy/route.ts`](/Users/tommaso/personal-projects/r-u-experienced-builder/app/api/deploy/route.ts)
  - `runtime = 'nodejs'` (needs `fs`)
  - Validates request body (manual or `zod`), then:
    - Reads the `template/` directory
    - Builds Vercel `files[]` payload (including binary assets from `template/public/`)
    - Patches **existing template files** in-memory before creating the deployment payload:
      - `template/components/hero-section.tsx` (copy)
      - `template/app/layout.tsx` (fonts; no preloading)
      - `template/app/globals.css` (palette variables)
    - Calls Vercel deploy

## Vercel SDK wrapper upgrades

- Expand [`/Users/tommaso/personal-projects/r-u-experienced-builder/lib/vercel.ts`](/Users/tommaso/personal-projects/r-u-experienced-builder/lib/vercel.ts) to support:
  - `createDeployment({ name, files, target: 'production', teamId? })`
  - `waitForDeploymentReady({ deploymentId })` polling `getDeployment`
  - `assignAlias({ deploymentId, alias })` to create `https://<siteName>.vercel.app`
  - Optional `teamId`/`slug` support via env vars if needed later

## Env vars + local setup

- `VERCEL_TOKEN` required (already assumed by `lib/vercel.ts`).
- Optional (future-proof): `VERCEL_TEAM_ID` if deploying under a team.

## Verification

- Local:
  - Run the builder, deploy a sample site name, confirm returned URL is reachable.
- Safety:
  - Confirm the deploy payload includes `package.json`, lockfile, `app/`, `components/`, `public/`.
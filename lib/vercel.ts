import { Vercel } from '@vercel/sdk'

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
})

export type DeploymentFiles = Parameters<
  typeof vercel.deployments.createDeployment
>[0]['requestBody']['files']

export interface CreateDeploymentOptions {
  files: DeploymentFiles
  name: string
  target?: 'production' | 'preview'
  teamId?: string
}

/**
 * Create a new deployment on Vercel
 */
export const createDeployment = async ({
  files,
  name,
  target = 'production',
  teamId,
}: CreateDeploymentOptions) => {
  const deployment = await vercel.deployments.createDeployment({
    teamId,
    requestBody: {
      files,
      name,
      target,
      projectSettings: {
        framework: 'nextjs',
      },
    },
  })
  return deployment
}

type DeploymentStatus =
  | 'BUILDING'
  | 'ERROR'
  | 'INITIALIZING'
  | 'QUEUED'
  | 'READY'
  | 'CANCELED'

/**
 * Wait for a deployment to be ready
 * Polls the deployment status until it's READY or fails
 */
export const waitForDeploymentReady = async ({
  deploymentId,
  teamId,
  maxAttempts = 60,
  pollInterval = 5000,
}: {
  deploymentId: string
  teamId?: string
  maxAttempts?: number
  pollInterval?: number
}): Promise<{ status: DeploymentStatus; url: string | null }> => {
  let attempts = 0

  while (attempts < maxAttempts) {
    const response = await vercel.deployments.getDeployment({
      idOrUrl: deploymentId,
      teamId,
    })

    const status = response.status as DeploymentStatus

    if (status === 'READY') {
      return { status, url: response.url ?? null }
    }

    if (status === 'ERROR' || status === 'CANCELED') {
      return { status, url: null }
    }

    // Still building, wait and try again
    await new Promise((resolve) => setTimeout(resolve, pollInterval))
    attempts++
  }

  throw new Error(
    `Deployment ${deploymentId} did not complete within ${(maxAttempts * pollInterval) / 1000} seconds`,
  )
}

/**
 * Assign an alias to a deployment
 * This creates a stable URL like sitename.vercel.app
 */
export const assignAlias = async ({
  deploymentId,
  alias,
  teamId,
}: {
  deploymentId: string
  alias: string
  teamId?: string
}): Promise<{ alias: string; uid: string }> => {
  const response = await vercel.aliases.assignAlias({
    id: deploymentId,
    teamId,
    requestBody: {
      alias,
      redirect: null,
    },
  })

  return {
    alias: response.alias,
    uid: response.uid,
  }
}

/**
 * Full deployment flow: create, wait for ready, assign alias
 */
export const deployAndAlias = async ({
  files,
  name,
  teamId,
}: {
  files: DeploymentFiles
  name: string
  teamId?: string
}): Promise<{
  deploymentId: string
  deploymentUrl: string
}> => {
  // 1. Create the deployment
  const deployment = await createDeployment({
    files,
    name,
    target: 'production',
    teamId,
  })

  const deploymentId = deployment.id

  // 2. Wait for deployment to be ready
  const { status, url } = await waitForDeploymentReady({
    deploymentId,
    teamId,
  })

  if (status !== 'READY' || !url) {
    throw new Error(`Deployment failed with status: ${status}`)
  }

  return {
    deploymentId,
    deploymentUrl: `https://${url}`,
  }
}

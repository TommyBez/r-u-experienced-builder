import { Vercel } from '@vercel/sdk'

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
})

export const createDeployment = async ({
  files,
  name,
}: {
  files: Parameters<
    typeof vercel.deployments.createDeployment
  >[0]['requestBody']['files']
  name: string
}) => {
  const deployment = await vercel.deployments.createDeployment({
    requestBody: {
      files,
      name,
    },
  })
  return deployment
}

'use client'

import { IconExternalLink, IconLoader2, IconRocket } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface DeployButtonProps {
  propertyId: string
}

interface DeployState {
  status: 'idle' | 'loading' | 'success' | 'error'
  url?: string
  error?: string
}

export function DeployButton({ propertyId }: DeployButtonProps) {
  const [state, setState] = useState<DeployState>({ status: 'idle' })

  const handleDeploy = async () => {
    setState({ status: 'loading' })

    try {
      const response = await fetch(`/api/properties/${propertyId}/deploy`, {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        setState({
          status: 'error',
          error: data.error || 'Deployment failed.',
        })
        return
      }

      setState({
        status: 'success',
        url: data.deploymentUrl,
      })
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Deployment failed.',
      })
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button disabled={state.status === 'loading'} onClick={handleDeploy}>
        {state.status === 'loading' ? (
          <>
            <IconLoader2 className="animate-spin" />
            Deploying...
          </>
        ) : (
          <>
            <IconRocket />
            Deploy to Vercel
          </>
        )}
      </Button>
      {state.status === 'error' && state.error && (
        <p className="text-destructive text-sm">Error: {state.error}</p>
      )}
      {state.status === 'success' && state.url && (
        <a
          className="flex items-center gap-1 text-primary text-sm underline"
          href={state.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {state.url}
          <IconExternalLink className="size-4" />
        </a>
      )}
    </div>
  )
}

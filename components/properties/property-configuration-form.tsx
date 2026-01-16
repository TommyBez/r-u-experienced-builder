'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface ConfigurationState {
  error?: string | null
  success?: boolean
}

interface PropertyConfigurationFormProps {
  defaultValue: string
  action: (
    prevState: ConfigurationState,
    formData: FormData,
  ) => Promise<ConfigurationState>
}

export function PropertyConfigurationForm({
  defaultValue,
  action,
}: PropertyConfigurationFormProps) {
  const [state, formAction] = useActionState(action, {
    error: null,
    success: false,
  })

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          className="min-h-[320px] font-mono text-sm"
          defaultValue={defaultValue}
          name="configuration"
          spellCheck={false}
        />
        {state.error && <FieldError>{state.error}</FieldError>}
        {state.success && (
          <p className="text-green-600 text-sm">Configuration saved.</p>
        )}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Saving...' : 'Save configuration'}
    </Button>
  )
}

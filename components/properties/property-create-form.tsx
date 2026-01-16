'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface CreatePropertyState {
  error?: string | null
}

interface PropertyCreateFormProps {
  action: (
    prevState: CreatePropertyState,
    formData: FormData,
  ) => Promise<CreatePropertyState>
}

export function PropertyCreateForm({ action }: PropertyCreateFormProps) {
  const [state, formAction] = useFormState(action, { error: null })

  return (
    <form action={formAction} className="space-y-4">
      <FieldGroup>
        {state.error && <FieldError>{state.error}</FieldError>}
        <Field>
          <FieldLabel htmlFor="name">Property name</FieldLabel>
          <FieldContent>
            <Input
              autoComplete="off"
              id="name"
              name="name"
              placeholder="Alpine Retreat"
              required
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Creating...' : 'Create property'}
    </Button>
  )
}

'use client'

import { IconLoader2 } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/auth-client'

export function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    const { error } = await signUp.email({
      email,
      password,
      name,
    })

    if (error) {
      setError(error.message || 'Failed to create account')
      setIsLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled={isLoading}
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              type="text"
              value={name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={isLoading}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              type="password"
              value={password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              disabled={isLoading}
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              type="password"
              value={confirmPassword}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && <IconLoader2 className="animate-spin" />}
            Create Account
          </Button>
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link className="text-primary hover:underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

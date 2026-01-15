'use client'

import { IconExternalLink, IconLoader2, IconRocket } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from '@/lib/auth-client'
import {
  type BuilderConfig,
  DEFAULT_HERO,
  FONT_OPTIONS,
  FONT_PRESETS,
  PALETTE_PRESETS,
} from '@/lib/template-patchers'

interface DeployResult {
  success: boolean
  url?: string
  error?: string
}

const formSchema = z.object({
  siteName: z.string().min(1, 'Please enter a site name'),
  hero: z.object({
    kicker: z.string().min(1, 'Kicker is required'),
    headline: z.string().min(1, 'Headline is required'),
    description: z.string().min(1, 'Description is required'),
    primaryCta: z.string().min(1, 'Primary CTA is required'),
    secondaryCta: z.string().min(1, 'Secondary CTA is required'),
  }),
  fontPreset: z.enum([
    'classic',
    'modern',
    'editorial',
    'elegant',
    'friendly',
    'custom',
  ]),
  customFonts: z.object({
    sans: z.string().min(1, 'Sans-serif font is required'),
    serif: z.string().min(1, 'Serif font is required'),
  }),
  palettePreset: z.enum(['minimal', 'ocean', 'forest', 'sunset', 'lavender']),
})

export function BuilderForm() {
  const { isPending: isSessionLoading } = useSession()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null)

  const form = useForm({
    defaultValues: {
      siteName: '',
      hero: DEFAULT_HERO,
      fontPreset: 'classic',
      customFonts: {
        sans: 'Inter',
        serif: 'Playfair_Display',
      },
      palettePreset: 'minimal',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsDeploying(true)
      setDeployResult(null)

      try {
        // Get fonts based on preset or custom
        const fonts =
          value.fontPreset === 'custom'
            ? value.customFonts
            : {
                sans: FONT_PRESETS[
                  value.fontPreset as keyof typeof FONT_PRESETS
                ].sans,
                serif:
                  FONT_PRESETS[value.fontPreset as keyof typeof FONT_PRESETS]
                    .serif,
              }

        // Get palette from preset
        const palette =
          PALETTE_PRESETS[value.palettePreset as keyof typeof PALETTE_PRESETS]

        const config: BuilderConfig = {
          siteName: value.siteName,
          hero: value.hero,
          fonts,
          palette: {
            light: { ...palette.light },
            dark: { ...palette.dark },
          },
        }

        const response = await fetch('/api/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        })

        const data = await response.json()

        if (response.ok) {
          setDeployResult({ success: true, url: data.url })
        } else {
          setDeployResult({
            success: false,
            error: data.error || 'Deployment failed',
          })
        }
      } catch (error) {
        setDeployResult({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      } finally {
        setIsDeploying(false)
      }
    },
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Website Builder</h1>
        <p className="text-muted-foreground">
          Customize your site and deploy it to Vercel in seconds
        </p>
      </div>

      <form
        id="builder-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="space-y-6">
          {/* Site Name */}
          <Card>
            <CardHeader>
              <CardTitle>Site Name</CardTitle>
              <CardDescription>
                Choose a unique name for your site. This will become your URL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form.Field name="siteName">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Site Name</FieldLabel>
                      <div className="flex items-center gap-2">
                        <Input
                          aria-invalid={isInvalid}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="my-awesome-site"
                          value={field.state.value}
                        />
                        <span className="text-muted-foreground text-sm">
                          .vercel.app
                        </span>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Customize the main hero section copy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <form.Field name="hero.kicker">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Kicker</FieldLabel>
                          <Input
                            aria-invalid={isInvalid}
                            id={field.name}
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Your Brand"
                            value={field.state.value}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  </form.Field>
                  <form.Field name="hero.headline">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Headline</FieldLabel>
                          <Input
                            aria-invalid={isInvalid}
                            id={field.name}
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Your main headline"
                            value={field.state.value}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  </form.Field>
                </div>
                <form.Field name="hero.description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Description
                        </FieldLabel>
                        <Textarea
                          aria-invalid={isInvalid}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="A compelling description of what you offer..."
                          value={field.state.value}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
                <div className="grid grid-cols-2 gap-4">
                  <form.Field name="hero.primaryCta">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Primary Button
                          </FieldLabel>
                          <Input
                            aria-invalid={isInvalid}
                            id={field.name}
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Get Started"
                            value={field.state.value}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  </form.Field>
                  <form.Field name="hero.secondaryCta">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Secondary Button
                          </FieldLabel>
                          <Input
                            aria-invalid={isInvalid}
                            id={field.name}
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Learn More"
                            value={field.state.value}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  </form.Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Choose your font pairing</CardDescription>
            </CardHeader>
            <CardContent>
              <form.Field name="fontPreset">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Tabs
                        onValueChange={(value) => {
                          if (value === 'custom') {
                            field.handleChange('custom')
                          } else if (field.state.value === 'custom') {
                            // Keep current preset if switching to presets tab
                            field.handleChange('classic')
                          }
                        }}
                        value={
                          field.state.value === 'custom' ? 'custom' : 'presets'
                        }
                      >
                        <TabsList>
                          <TabsTrigger value="presets">Presets</TabsTrigger>
                          <TabsTrigger value="custom">Custom</TabsTrigger>
                        </TabsList>
                        <TabsContent className="pt-4" value="presets">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {(
                              Object.keys(FONT_PRESETS) as Array<
                                keyof typeof FONT_PRESETS
                              >
                            ).map((key) => {
                              const preset = FONT_PRESETS[key]
                              return (
                                <button
                                  className={`rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                                    field.state.value === key
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border'
                                  }`}
                                  key={key}
                                  onClick={() => field.handleChange(key)}
                                  type="button"
                                >
                                  <div className="font-medium text-sm">
                                    {preset.name}
                                  </div>
                                  <div className="mt-1 text-muted-foreground text-xs">
                                    {preset.sans.replace(/_/g, ' ')} +{' '}
                                    {preset.serif.replace(/_/g, ' ')}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </TabsContent>
                        <TabsContent className="space-y-4 pt-4" value="custom">
                          <FieldGroup>
                            <form.Field name="customFonts.sans">
                              {(sansField) => {
                                const isSansInvalid =
                                  sansField.state.meta.isTouched &&
                                  !sansField.state.meta.isValid
                                return (
                                  <Field data-invalid={isSansInvalid}>
                                    <FieldLabel>Sans-serif Font</FieldLabel>
                                    <Select
                                      name={sansField.name}
                                      onValueChange={(v) => {
                                        sansField.handleChange(v)
                                        // Ensure fontPreset is set to custom when custom fonts change
                                        if (field.state.value !== 'custom') {
                                          field.handleChange('custom')
                                        }
                                      }}
                                      value={sansField.state.value}
                                    >
                                      <SelectTrigger
                                        aria-invalid={isSansInvalid}
                                        className="w-full"
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>Sans-serif</SelectLabel>
                                          {FONT_OPTIONS.sans.map((font) => (
                                            <SelectItem
                                              key={font.importName}
                                              value={font.importName}
                                            >
                                              {font.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    {isSansInvalid && (
                                      <FieldError
                                        errors={sansField.state.meta.errors}
                                      />
                                    )}
                                  </Field>
                                )
                              }}
                            </form.Field>
                            <form.Field name="customFonts.serif">
                              {(serifField) => {
                                const isSerifInvalid =
                                  serifField.state.meta.isTouched &&
                                  !serifField.state.meta.isValid
                                return (
                                  <Field data-invalid={isSerifInvalid}>
                                    <FieldLabel>Serif Font</FieldLabel>
                                    <Select
                                      name={serifField.name}
                                      onValueChange={(v) => {
                                        serifField.handleChange(v)
                                        // Ensure fontPreset is set to custom when custom fonts change
                                        if (field.state.value !== 'custom') {
                                          field.handleChange('custom')
                                        }
                                      }}
                                      value={serifField.state.value}
                                    >
                                      <SelectTrigger
                                        aria-invalid={isSerifInvalid}
                                        className="w-full"
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>Serif</SelectLabel>
                                          {FONT_OPTIONS.serif.map((font) => (
                                            <SelectItem
                                              key={font.importName}
                                              value={font.importName}
                                            >
                                              {font.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    {isSerifInvalid && (
                                      <FieldError
                                        errors={serifField.state.meta.errors}
                                      />
                                    )}
                                  </Field>
                                )
                              }}
                            </form.Field>
                          </FieldGroup>
                        </TabsContent>
                      </Tabs>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                Choose a color scheme for your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form.Field name="palettePreset">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                        {(
                          Object.keys(PALETTE_PRESETS) as Array<
                            keyof typeof PALETTE_PRESETS
                          >
                        ).map((key) => {
                          const preset = PALETTE_PRESETS[key]
                          return (
                            <button
                              className={`rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                                field.state.value === key
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                              key={key}
                              onClick={() => field.handleChange(key)}
                              type="button"
                            >
                              <div className="font-medium text-sm">
                                {preset.name}
                              </div>
                              <div className="mt-2 flex gap-1">
                                <div
                                  className="size-4 rounded-full ring-1 ring-black/10"
                                  style={{ background: preset.light.primary }}
                                />
                                <div
                                  className="size-4 rounded-full ring-1 ring-black/10"
                                  style={{
                                    background: preset.light.background,
                                  }}
                                />
                                <div
                                  className="size-4 rounded-full ring-1 ring-black/10"
                                  style={{ background: preset.light.accent }}
                                />
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* Deploy Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                className="w-full"
                disabled={
                  isDeploying ||
                  !form.state.values.siteName.trim() ||
                  isSessionLoading
                }
                form="builder-form"
                size="lg"
                type="submit"
              >
                {isDeploying ? (
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
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Deploy Result */}
      {deployResult && (
        <Card
          className={
            deployResult.success ? 'border-green-500' : 'border-destructive'
          }
        >
          <CardContent className="pt-6">
            {deployResult.success ? (
              <div className="space-y-3">
                <div className="font-medium text-green-600">
                  Deployment successful!
                </div>
                <div className="flex items-center gap-2">
                  <a
                    className="text-primary underline"
                    href={deployResult.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {deployResult.url}
                  </a>
                  <IconExternalLink className="size-4" />
                </div>
              </div>
            ) : (
              <div className="text-destructive">
                Error: {deployResult.error}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

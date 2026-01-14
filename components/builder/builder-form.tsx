'use client'

import { IconExternalLink, IconLoader2, IconRocket } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  type BuilderConfig,
  DEFAULT_HERO,
  FONT_OPTIONS,
  FONT_PRESETS,
  PALETTE_PRESETS,
  type PaletteConfig,
} from '@/lib/template-patchers'

interface DeployResult {
  success: boolean
  url?: string
  error?: string
}

export function BuilderForm() {
  // Site name
  const [siteName, setSiteName] = useState('')

  // Hero config
  const [hero, setHero] = useState(DEFAULT_HERO)

  // Font config
  const [fontPreset, setFontPreset] = useState<
    keyof typeof FONT_PRESETS | 'custom'
  >('classic')
  const [customFonts, setCustomFonts] = useState({
    sans: 'Inter',
    serif: 'Playfair_Display',
  })

  // Palette config
  const [palettePreset, setPalettePreset] =
    useState<keyof typeof PALETTE_PRESETS>('minimal')

  // Deploy state
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null)

  const getFonts = () => {
    if (fontPreset === 'custom') {
      return customFonts
    }
    const preset = FONT_PRESETS[fontPreset]
    return { sans: preset.sans, serif: preset.serif }
  }

  const getPalette = (): { light: PaletteConfig; dark: PaletteConfig } => {
    const preset = PALETTE_PRESETS[palettePreset]
    return {
      light: { ...preset.light },
      dark: { ...preset.dark },
    }
  }

  const handleDeploy = async () => {
    if (!siteName.trim()) {
      setDeployResult({ success: false, error: 'Please enter a site name' })
      return
    }

    setIsDeploying(true)
    setDeployResult(null)

    try {
      const config: BuilderConfig = {
        siteName,
        hero,
        fonts: getFonts(),
        palette: getPalette(),
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
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Website Builder</h1>
        <p className="text-muted-foreground">
          Customize your site and deploy it to Vercel in seconds
        </p>
      </div>

      {/* Site Name */}
      <Card>
        <CardHeader>
          <CardTitle>Site Name</CardTitle>
          <CardDescription>
            Choose a unique name for your site. This will become your URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="my-awesome-site"
              value={siteName}
            />
            <span className="text-muted-foreground text-sm">.vercel.app</span>
          </div>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kicker">Kicker</Label>
              <Input
                id="kicker"
                onChange={(e) => setHero({ ...hero, kicker: e.target.value })}
                placeholder="Your Brand"
                value={hero.kicker}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                placeholder="Your main headline"
                value={hero.headline}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              onChange={(e) =>
                setHero({ ...hero, description: e.target.value })
              }
              placeholder="A compelling description of what you offer..."
              value={hero.description}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryCta">Primary Button</Label>
              <Input
                id="primaryCta"
                onChange={(e) =>
                  setHero({ ...hero, primaryCta: e.target.value })
                }
                placeholder="Get Started"
                value={hero.primaryCta}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryCta">Secondary Button</Label>
              <Input
                id="secondaryCta"
                onChange={(e) =>
                  setHero({ ...hero, secondaryCta: e.target.value })
                }
                placeholder="Learn More"
                value={hero.secondaryCta}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Choose your font pairing</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="presets">
            <TabsList>
              <TabsTrigger value="presets">Presets</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            <TabsContent className="pt-4" value="presets">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {(
                  Object.keys(FONT_PRESETS) as Array<keyof typeof FONT_PRESETS>
                ).map((key) => {
                  const preset = FONT_PRESETS[key]
                  return (
                    <button
                      className={`rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                        fontPreset === key
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      key={key}
                      onClick={() => setFontPreset(key)}
                      type="button"
                    >
                      <div className="font-medium text-sm">{preset.name}</div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sans-serif Font</Label>
                  <Select
                    onValueChange={(v) => {
                      setFontPreset('custom')
                      setCustomFonts({ ...customFonts, sans: v })
                    }}
                    value={customFonts.sans}
                  >
                    <SelectTrigger className="w-full">
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
                </div>
                <div className="space-y-2">
                  <Label>Serif Font</Label>
                  <Select
                    onValueChange={(v) => {
                      setFontPreset('custom')
                      setCustomFonts({ ...customFonts, serif: v })
                    }}
                    value={customFonts.serif}
                  >
                    <SelectTrigger className="w-full">
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
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Choose a color scheme for your site</CardDescription>
        </CardHeader>
        <CardContent>
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
                    palettePreset === key
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                  key={key}
                  onClick={() => setPalettePreset(key)}
                  type="button"
                >
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="mt-2 flex gap-1">
                    <div
                      className="size-4 rounded-full ring-1 ring-black/10"
                      style={{ background: preset.light.primary }}
                    />
                    <div
                      className="size-4 rounded-full ring-1 ring-black/10"
                      style={{ background: preset.light.background }}
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
        </CardContent>
      </Card>

      {/* Deploy Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            className="w-full"
            disabled={isDeploying || !siteName.trim()}
            onClick={handleDeploy}
            size="lg"
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

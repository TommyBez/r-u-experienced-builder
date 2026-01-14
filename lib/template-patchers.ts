// Types for builder configuration
export interface HeroConfig {
  kicker: string
  headline: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface FontConfig {
  sans: string // e.g. "Inter", "Poppins", "Open_Sans"
  serif: string // e.g. "Playfair_Display", "Lora", "Merriweather"
}

export interface PaletteConfig {
  // Core colors (OKLCH format)
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  border: string
  ring: string
}

export interface BuilderConfig {
  siteName: string
  hero: HeroConfig
  fonts: FontConfig
  palette: {
    light: PaletteConfig
    dark: PaletteConfig
  }
}

// Font presets with their next/font/google import names
export const FONT_OPTIONS = {
  sans: [
    { name: 'Inter', importName: 'Inter' },
    { name: 'Poppins', importName: 'Poppins' },
    { name: 'Open Sans', importName: 'Open_Sans' },
    { name: 'Roboto', importName: 'Roboto' },
    { name: 'Lato', importName: 'Lato' },
    { name: 'Source Sans 3', importName: 'Source_Sans_3' },
    { name: 'Nunito', importName: 'Nunito' },
    { name: 'Work Sans', importName: 'Work_Sans' },
  ],
  serif: [
    { name: 'Playfair Display', importName: 'Playfair_Display' },
    { name: 'Lora', importName: 'Lora' },
    { name: 'Merriweather', importName: 'Merriweather' },
    { name: 'Libre Baskerville', importName: 'Libre_Baskerville' },
    { name: 'Crimson Text', importName: 'Crimson_Text' },
    { name: 'Source Serif 4', importName: 'Source_Serif_4' },
    { name: 'EB Garamond', importName: 'EB_Garamond' },
    { name: 'Cormorant Garamond', importName: 'Cormorant_Garamond' },
  ],
} as const

// Color palette presets
export const PALETTE_PRESETS = {
  minimal: {
    name: 'Minimal',
    light: {
      background: 'oklch(0.99 0 0)',
      foreground: 'oklch(0 0 0)',
      primary: 'oklch(0 0 0)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.94 0 0)',
      secondaryForeground: 'oklch(0 0 0)',
      muted: 'oklch(0.97 0 0)',
      mutedForeground: 'oklch(0.44 0 0)',
      accent: 'oklch(0.94 0 0)',
      accentForeground: 'oklch(0 0 0)',
      border: 'oklch(0.92 0 0)',
      ring: 'oklch(0 0 0)',
    },
    dark: {
      background: 'oklch(0 0 0)',
      foreground: 'oklch(1 0 0)',
      primary: 'oklch(1 0 0)',
      primaryForeground: 'oklch(0 0 0)',
      secondary: 'oklch(0.25 0 0)',
      secondaryForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.23 0 0)',
      mutedForeground: 'oklch(0.72 0 0)',
      accent: 'oklch(0.32 0 0)',
      accentForeground: 'oklch(1 0 0)',
      border: 'oklch(0.26 0 0)',
      ring: 'oklch(0.72 0 0)',
    },
  },
  ocean: {
    name: 'Ocean',
    light: {
      background: 'oklch(0.98 0.01 230)',
      foreground: 'oklch(0.15 0.02 240)',
      primary: 'oklch(0.55 0.15 240)',
      primaryForeground: 'oklch(0.98 0.01 230)',
      secondary: 'oklch(0.92 0.02 230)',
      secondaryForeground: 'oklch(0.15 0.02 240)',
      muted: 'oklch(0.95 0.01 230)',
      mutedForeground: 'oklch(0.45 0.03 240)',
      accent: 'oklch(0.65 0.12 200)',
      accentForeground: 'oklch(0.15 0.02 240)',
      border: 'oklch(0.88 0.02 230)',
      ring: 'oklch(0.55 0.15 240)',
    },
    dark: {
      background: 'oklch(0.15 0.02 240)',
      foreground: 'oklch(0.95 0.01 230)',
      primary: 'oklch(0.65 0.12 240)',
      primaryForeground: 'oklch(0.15 0.02 240)',
      secondary: 'oklch(0.25 0.03 240)',
      secondaryForeground: 'oklch(0.95 0.01 230)',
      muted: 'oklch(0.22 0.02 240)',
      mutedForeground: 'oklch(0.65 0.02 230)',
      accent: 'oklch(0.55 0.10 200)',
      accentForeground: 'oklch(0.95 0.01 230)',
      border: 'oklch(0.28 0.02 240)',
      ring: 'oklch(0.65 0.12 240)',
    },
  },
  forest: {
    name: 'Forest',
    light: {
      background: 'oklch(0.98 0.01 140)',
      foreground: 'oklch(0.18 0.03 150)',
      primary: 'oklch(0.45 0.12 150)',
      primaryForeground: 'oklch(0.98 0.01 140)',
      secondary: 'oklch(0.92 0.02 140)',
      secondaryForeground: 'oklch(0.18 0.03 150)',
      muted: 'oklch(0.95 0.01 140)',
      mutedForeground: 'oklch(0.45 0.03 150)',
      accent: 'oklch(0.55 0.10 120)',
      accentForeground: 'oklch(0.18 0.03 150)',
      border: 'oklch(0.88 0.02 140)',
      ring: 'oklch(0.45 0.12 150)',
    },
    dark: {
      background: 'oklch(0.15 0.02 150)',
      foreground: 'oklch(0.95 0.01 140)',
      primary: 'oklch(0.55 0.10 150)',
      primaryForeground: 'oklch(0.15 0.02 150)',
      secondary: 'oklch(0.25 0.02 150)',
      secondaryForeground: 'oklch(0.95 0.01 140)',
      muted: 'oklch(0.22 0.02 150)',
      mutedForeground: 'oklch(0.65 0.02 140)',
      accent: 'oklch(0.50 0.08 120)',
      accentForeground: 'oklch(0.95 0.01 140)',
      border: 'oklch(0.28 0.02 150)',
      ring: 'oklch(0.55 0.10 150)',
    },
  },
  sunset: {
    name: 'Sunset',
    light: {
      background: 'oklch(0.99 0.01 50)',
      foreground: 'oklch(0.18 0.03 30)',
      primary: 'oklch(0.60 0.18 30)',
      primaryForeground: 'oklch(0.99 0.01 50)',
      secondary: 'oklch(0.94 0.02 50)',
      secondaryForeground: 'oklch(0.18 0.03 30)',
      muted: 'oklch(0.96 0.01 50)',
      mutedForeground: 'oklch(0.50 0.04 30)',
      accent: 'oklch(0.70 0.15 60)',
      accentForeground: 'oklch(0.18 0.03 30)',
      border: 'oklch(0.90 0.02 50)',
      ring: 'oklch(0.60 0.18 30)',
    },
    dark: {
      background: 'oklch(0.15 0.02 30)',
      foreground: 'oklch(0.96 0.01 50)',
      primary: 'oklch(0.70 0.15 30)',
      primaryForeground: 'oklch(0.15 0.02 30)',
      secondary: 'oklch(0.25 0.02 30)',
      secondaryForeground: 'oklch(0.96 0.01 50)',
      muted: 'oklch(0.22 0.02 30)',
      mutedForeground: 'oklch(0.65 0.02 50)',
      accent: 'oklch(0.65 0.12 60)',
      accentForeground: 'oklch(0.96 0.01 50)',
      border: 'oklch(0.28 0.02 30)',
      ring: 'oklch(0.70 0.15 30)',
    },
  },
  lavender: {
    name: 'Lavender',
    light: {
      background: 'oklch(0.98 0.01 290)',
      foreground: 'oklch(0.18 0.03 300)',
      primary: 'oklch(0.55 0.15 290)',
      primaryForeground: 'oklch(0.98 0.01 290)',
      secondary: 'oklch(0.93 0.02 290)',
      secondaryForeground: 'oklch(0.18 0.03 300)',
      muted: 'oklch(0.95 0.01 290)',
      mutedForeground: 'oklch(0.48 0.04 300)',
      accent: 'oklch(0.65 0.12 320)',
      accentForeground: 'oklch(0.18 0.03 300)',
      border: 'oklch(0.89 0.02 290)',
      ring: 'oklch(0.55 0.15 290)',
    },
    dark: {
      background: 'oklch(0.15 0.02 300)',
      foreground: 'oklch(0.95 0.01 290)',
      primary: 'oklch(0.65 0.12 290)',
      primaryForeground: 'oklch(0.15 0.02 300)',
      secondary: 'oklch(0.25 0.02 300)',
      secondaryForeground: 'oklch(0.95 0.01 290)',
      muted: 'oklch(0.22 0.02 300)',
      mutedForeground: 'oklch(0.65 0.02 290)',
      accent: 'oklch(0.58 0.10 320)',
      accentForeground: 'oklch(0.95 0.01 290)',
      border: 'oklch(0.28 0.02 300)',
      ring: 'oklch(0.65 0.12 290)',
    },
  },
} as const

// Font preset pairings
export const FONT_PRESETS = {
  classic: {
    name: 'Classic',
    sans: 'Inter',
    serif: 'Playfair_Display',
  },
  modern: {
    name: 'Modern',
    sans: 'Poppins',
    serif: 'Lora',
  },
  editorial: {
    name: 'Editorial',
    sans: 'Source_Sans_3',
    serif: 'Source_Serif_4',
  },
  elegant: {
    name: 'Elegant',
    sans: 'Work_Sans',
    serif: 'Cormorant_Garamond',
  },
  friendly: {
    name: 'Friendly',
    sans: 'Nunito',
    serif: 'Merriweather',
  },
} as const

// Default hero content
export const DEFAULT_HERO: HeroConfig = {
  kicker: 'Casa Immaginaria',
  headline: 'Il tuo rifugio urbano',
  description:
    'Tra comfort e stile, scopri un nuovo modo di vivere la città. Rilassati, esplora e sentiti a casa fin dal primo momento.',
  primaryCta: 'Esplora la casa',
  secondaryCta: 'Scopri esperienze',
}

// Regex patterns for hero section patching (defined at top level for performance)
const HERO_KICKER_REGEX = /(<h2[^>]*>\s*)Casa Immaginaria(\s*<\/h2>)/
const HERO_HEADLINE_REGEX = /(<h1[^>]*>\s*)Il tuo rifugio urbano(\s*<\/h1>)/
const HERO_DESCRIPTION_REGEX =
  /(<p[^>]*className="[^"]*text-muted-foreground[^"]*"[^>]*>\s*)Tra comfort e stile, scopri un nuovo modo di vivere la città\.\s*Rilassati, esplora e sentiti a casa fin dal primo momento\.(\s*<\/p>)/s
const HERO_PRIMARY_CTA_REGEX =
  /(<Button[^>]*>\s*)Esplora la casa(\s*<\/Button>)/
const HERO_SECONDARY_CTA_REGEX =
  /(<Button[^>]*variant="outline"[^>]*>\s*)Scopri esperienze(\s*<\/Button>)/

/**
 * Patches hero-section.tsx with new copy
 */
export function patchHeroSection(source: string, hero: HeroConfig): string {
  let result = source

  // Replace kicker (h2 content)
  result = result.replace(HERO_KICKER_REGEX, `$1${hero.kicker}$2`)

  // Replace headline (h1 content)
  result = result.replace(HERO_HEADLINE_REGEX, `$1${hero.headline}$2`)

  // Replace description (p content) - multiline
  result = result.replace(HERO_DESCRIPTION_REGEX, `$1${hero.description}$2`)

  // Replace primary CTA
  result = result.replace(HERO_PRIMARY_CTA_REGEX, `$1${hero.primaryCta}$2`)

  // Replace secondary CTA (the outline variant)
  result = result.replace(HERO_SECONDARY_CTA_REGEX, `$1${hero.secondaryCta}$2`)

  return result
}

// Regex patterns for layout patching (defined at top level for performance)
const LAYOUT_FONT_IMPORT_REGEX = /import \{[^}]+\} from 'next\/font\/google'/
const LAYOUT_FONT_DECLARATIONS_REGEX =
  /const playfair = Playfair_Display\(\{[\s\S]*?\}\)\s*const inter = Inter\(\{[^}]+\}\)/
const LAYOUT_BODY_CLASSNAME_REGEX =
  /className=\{`\$\{playfair\.variable\} \$\{inter\.variable\} font-sans antialiased`\}/

/**
 * Patches layout.tsx with new font imports
 */
export function patchLayout(source: string, fonts: FontConfig): string {
  // Build new import statement
  const newImport = `import { ${fonts.serif}, ${fonts.sans} } from 'next/font/google'`

  // Build new font declarations
  const serifVarName =
    fonts.serif.charAt(0).toLowerCase() + fonts.serif.slice(1).replace(/_/g, '')
  const sansVarName =
    fonts.sans.charAt(0).toLowerCase() + fonts.sans.slice(1).replace(/_/g, '')

  const newFontDeclarations = `const ${serifVarName} = ${fonts.serif}({
  subsets: ['latin'],
  variable: '--font-serif',
})
const ${sansVarName} = ${fonts.sans}({ subsets: ['latin'], variable: '--font-sans' })`

  let result = source

  // Replace import statement
  result = result.replace(LAYOUT_FONT_IMPORT_REGEX, newImport)

  // Replace font declarations (multiline)
  result = result.replace(LAYOUT_FONT_DECLARATIONS_REGEX, newFontDeclarations)

  // Replace body className with new variable names
  result = result.replace(
    LAYOUT_BODY_CLASSNAME_REGEX,
    `className={\`\${${serifVarName}.variable} \${${sansVarName}.variable} font-sans antialiased\`}`,
  )

  return result
}

// Regex patterns for CSS patching (defined at top level for performance)
const CSS_ROOT_BLOCK_REGEX = /(:root\s*\{)([\s\S]*?)(\})/
const CSS_DARK_BLOCK_REGEX = /(\.dark\s*\{)([\s\S]*?)(\})/
const CSS_VAR_ESCAPE_REGEX = /[-/\\^$*+?.()|[\]{}]/g

// CSS variable mappings
const CSS_PALETTE_VARS: [string, keyof PaletteConfig][] = [
  ['--background', 'background'],
  ['--foreground', 'foreground'],
  ['--primary', 'primary'],
  ['--primary-foreground', 'primaryForeground'],
  ['--secondary', 'secondary'],
  ['--secondary-foreground', 'secondaryForeground'],
  ['--muted', 'muted'],
  ['--muted-foreground', 'mutedForeground'],
  ['--accent', 'accent'],
  ['--accent-foreground', 'accentForeground'],
  ['--border', 'border'],
  ['--ring', 'ring'],
]

/**
 * Helper to replace a CSS variable value within a selector block
 */
function replaceCssVar(
  css: string,
  varName: string,
  value: string,
  selector: ':root' | '.dark',
): string {
  const escapedVar = varName.replace(CSS_VAR_ESCAPE_REGEX, '\\$&')
  const blockRegex =
    selector === ':root' ? CSS_ROOT_BLOCK_REGEX : CSS_DARK_BLOCK_REGEX
  const match = css.match(blockRegex)

  if (match) {
    const [, start, content, end] = match
    const varRegex = new RegExp(`(${escapedVar}:\\s*)([^;]+)(;)`)
    const newContent = content.replace(varRegex, `$1${value}$3`)
    return css.replace(blockRegex, `${start}${newContent}${end}`)
  }

  return css
}

/**
 * Patches globals.css with new color palette
 */
export function patchGlobalsCss(
  source: string,
  palette: { light: PaletteConfig; dark: PaletteConfig },
): string {
  let result = source

  // Replace light mode palette variables
  for (const [cssVar, configKey] of CSS_PALETTE_VARS) {
    result = replaceCssVar(result, cssVar, palette.light[configKey], ':root')
  }

  // Replace dark mode palette variables
  for (const [cssVar, configKey] of CSS_PALETTE_VARS) {
    result = replaceCssVar(result, cssVar, palette.dark[configKey], '.dark')
  }

  return result
}

/**
 * Get default builder config
 */
export function getDefaultBuilderConfig(): Omit<BuilderConfig, 'siteName'> {
  return {
    hero: DEFAULT_HERO,
    fonts: {
      sans: 'Inter',
      serif: 'Playfair_Display',
    },
    palette: {
      light: PALETTE_PRESETS.minimal.light,
      dark: PALETTE_PRESETS.minimal.dark,
    },
  }
}

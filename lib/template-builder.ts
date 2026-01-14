import { readdirSync, readFileSync } from 'node:fs'
import { basename, extname, join, relative } from 'node:path'
import {
  type BuilderConfig,
  patchGlobalsCss,
  patchHeroSection,
  patchLayout,
} from './template-patchers'

// File extensions that should be treated as binary
const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
  '.mp4',
  '.webm',
  '.mp3',
  '.wav',
  '.pdf',
])

// Files/directories to exclude from the deployment
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  '.next',
  '.DS_Store',
  'pnpm-lock.yaml', // We'll regenerate this on Vercel
  '.env',
  '.env.local',
]

interface VercelFile {
  file: string
  data?: string // For text files (utf-8)
  encoding?: 'base64' | 'utf-8'
}

/**
 * Check if a file should be excluded from deployment
 */
function shouldExclude(filePath: string): boolean {
  const fileName = basename(filePath)
  return EXCLUDE_PATTERNS.some(
    (pattern) => filePath.includes(pattern) || fileName === pattern,
  )
}

/**
 * Check if a file is binary based on extension
 */
function isBinaryFile(filePath: string): boolean {
  const ext = extname(filePath).toLowerCase()
  return BINARY_EXTENSIONS.has(ext)
}

/**
 * Recursively read all files from a directory
 */
function readDirectoryRecursive(
  dirPath: string,
  baseDir: string,
): { relativePath: string; absolutePath: string }[] {
  const files: { relativePath: string; absolutePath: string }[] = []

  const entries = readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = join(dirPath, entry.name)
    const relativePath = relative(baseDir, absolutePath)

    if (shouldExclude(absolutePath)) {
      continue
    }

    if (entry.isDirectory()) {
      files.push(...readDirectoryRecursive(absolutePath, baseDir))
    } else if (entry.isFile()) {
      files.push({ relativePath, absolutePath })
    }
  }

  return files
}

/**
 * Build Vercel deployment files array from template directory
 * Applies patches to specific files based on builder config
 */
export function buildTemplateFiles(
  templateDir: string,
  config: Omit<BuilderConfig, 'siteName'>,
): VercelFile[] {
  const files = readDirectoryRecursive(templateDir, templateDir)
  const vercelFiles: VercelFile[] = []

  for (const { relativePath, absolutePath } of files) {
    const isBinary = isBinaryFile(absolutePath)

    if (isBinary) {
      // Read binary file and encode as base64
      const content = readFileSync(absolutePath)
      vercelFiles.push({
        file: relativePath,
        data: content.toString('base64'),
        encoding: 'base64',
      })
    } else {
      // Read text file
      let content = readFileSync(absolutePath, 'utf-8')

      // Apply patches to specific files
      if (relativePath === 'components/hero-section.tsx') {
        content = patchHeroSection(content, config.hero)
      } else if (relativePath === 'app/layout.tsx') {
        content = patchLayout(content, config.fonts)
      } else if (relativePath === 'app/globals.css') {
        content = patchGlobalsCss(content, config.palette)
      }

      vercelFiles.push({
        file: relativePath,
        data: content,
        encoding: 'utf-8',
      })
    }
  }

  return vercelFiles
}

/**
 * Get the absolute path to the template directory
 */
export function getTemplatePath(): string {
  // In development, template is relative to the project root
  // This works both locally and in the Vercel deployment
  return join(process.cwd(), 'template')
}

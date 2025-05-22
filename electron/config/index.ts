import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const require = createRequire(import.meta.url)
export const __dirname = path.dirname(fileURLToPath(import.meta.url))
export * from './path'
export * from './env'

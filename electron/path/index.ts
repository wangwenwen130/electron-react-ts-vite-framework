import path from 'node:path'

export const ROOT = '.'
export const RENDERER_PUBLIC = 'dist/entry'

export const MAIN_DIST = path.join(ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(ROOT, RENDERER_PUBLIC)
export const MAIN_WIN_DIST = path.join(RENDERER_DIST, 'main')
export const NOTIFY_WIN_DIST = path.join(RENDERER_DIST, 'notify')

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(ROOT, 'public') : RENDERER_DIST

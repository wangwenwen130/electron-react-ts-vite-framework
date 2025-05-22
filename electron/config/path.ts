import path from 'node:path'

export const ROOT = '.'

/** 主进程入口地址 */
export const MAIN_DIST = path.join(ROOT, 'dist-electron')

/** 渲染进程打包资源 总入口地址 */
export const RENDERER_PUBLIC = 'dist/entry'
export const RENDERER_DIST = path.join(ROOT, RENDERER_PUBLIC)
/** 渲染进程打包资源 总入口地址 */

/** 本地开发服务地址 */
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

/** public 地址 */
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(ROOT, 'public') : RENDERER_DIST

/** resource 文件夹地址 */
export const resourcePath = path.join(process.cwd(), 'resource')
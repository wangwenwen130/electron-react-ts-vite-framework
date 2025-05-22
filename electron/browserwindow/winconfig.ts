import { VITE_DEV_SERVER_URL, RENDERER_DIST } from 'ele/config'
import path from 'node:path'
import type { ConstrOptions } from './basewindow'

const preload = path.join(__dirname, '../preload/index.js')

export const baseConfig: Electron.BrowserWindowConstructorOptions = {
  title: '萤石远程桌面',
  icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
  titleBarStyle: undefined,
  useContentSize: true,
  autoHideMenuBar: true,
  minHeight: 580,
  minWidth: 900,
  webPreferences: {
    preload,
    nodeIntegration: false,
    contextIsolation: true,
  },
}

const main: ConstrOptions = {
  ...baseConfig,
  loadUrl: getPath('main'),
  handleEvent: (win) => {
    const webContents = win.webContents
    webContents.ipc.on('minimize', () => {
      win.minimize()
    })
    webContents.ipc.on('maximize', () => {
      win.maximize()
    })
    webContents.setWindowOpenHandler(() => {
      return { action: 'allow' }
    })
  },
}

const notify: ConstrOptions = {
  ...baseConfig,
  loadUrl: getPath('notify'),
}

export const winMap = {
  main,
  notify,
}

export function getPath(name: string) {
  if (VITE_DEV_SERVER_URL) return path.join(VITE_DEV_SERVER_URL, 'entry', name, '/')
  else return path.join(path.join(RENDERER_DIST, name), 'index.html')
}

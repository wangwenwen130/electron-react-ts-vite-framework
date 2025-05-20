import { VITE_DEV_SERVER_URL, MAIN_WIN_DIST, NOTIFY_WIN_DIST } from 'ele/config'
import path from 'node:path'

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

export const winMap = {
  main: {
    ...baseConfig,
    loadUrl: VITE_DEV_SERVER_URL
      ? path.join(VITE_DEV_SERVER_URL, 'entry', 'main/')
      : path.join(MAIN_WIN_DIST, 'index.html'),
  },
  notify: {
    ...baseConfig,
    loadUrl: VITE_DEV_SERVER_URL
      ? path.join(VITE_DEV_SERVER_URL, 'entry', 'notify/')
      : path.join(NOTIFY_WIN_DIST, 'index.html'),
  },
}

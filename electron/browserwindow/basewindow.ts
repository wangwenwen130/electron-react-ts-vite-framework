import { BrowserWindow, shell, type IpcMain } from 'electron'
import os from 'node:os'
import { isDev } from 'ele/config'

export const ipcReady = '__ipc_ready__'

interface RegisterEvent<K extends keyof IpcMain = keyof IpcMain> {
  type: K
  channel: Parameters<IpcMain[K]>[0]
  callback: Parameters<IpcMain[K]>[1]
}

export type ConstrOptions<K extends keyof IpcMain = keyof IpcMain> = Electron.BrowserWindowConstructorOptions & {
  loadUrl: string
  registIpcEvents?: RegisterEvent<K>[]
}

class BaseWindow<K extends keyof IpcMain = keyof IpcMain> extends BrowserWindow {
  win: BrowserWindow
  isRenderReady = false
  constructor(options: ConstrOptions<K>) {
    const { loadUrl, registIpcEvents, ...opt } = options
    super(opt)
    this.win = this
    this.load(loadUrl)
    registIpcEvents && this.registerIpcEvent(registIpcEvents)
    this.openDevTools()
  }

  load(url: string) {
    if (url.startsWith('http')) {
      this.loadURL(url)
    } else {
      this.loadFile(url)
    }
    // Make all links open with the browser, not with the application
    this.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })
  }

  registerIpcEvent<k extends keyof IpcMain>(events?: RegisterEvent<k>[]) {
    this.webContents.ipc.once('ipc-message', (event, channel, ...arg) => {
      if (channel === ipcReady) {
        this.isRenderReady = true
      }
    })
    events.forEach(({ type, channel, callback }) => {
      // @ts-ignore
      this.webContents.ipc[type](channel, callback)
    })
  }

  /**  获取窗口句柄 */
  getNativeWinHandle() {
    const hbuf = this.getNativeWindowHandle()
    if (os.endianness() === 'LE') {
      return hbuf.readInt32LE()
    } else {
      return hbuf.readInt32BE()
    }
  }

  openDevTools(options: Electron.OpenDevToolsOptions = { mode: 'right' }) {
    isDev && this.webContents.openDevTools(options)
  }
}

export default BaseWindow

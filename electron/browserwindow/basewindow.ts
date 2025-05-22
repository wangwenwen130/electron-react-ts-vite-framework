import { BrowserWindow, shell } from 'electron'
import os from 'node:os'
import { isDev } from 'ele/config'

export type ConstrOptions = Electron.BrowserWindowConstructorOptions & {
  loadUrl: string
  handleEvent?: (win: BrowserWindow) => void
}

class BaseWindow extends BrowserWindow {
  win: BrowserWindow
  isRenderReady = false
  constructor(options: ConstrOptions) {
    const { loadUrl, handleEvent, ...opt } = options
    super(opt)
    this.win = this
    this.load(loadUrl)
    this.openDevTools()
    this.listenIsReady()
    handleEvent && handleEvent(this)
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

  listenIsReady() {
    this.webContents.once('did-finish-load', () => {
      this.isRenderReady = true
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

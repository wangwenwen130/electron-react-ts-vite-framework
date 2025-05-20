import { winMap } from './winconfig'
import Base, { type ConstrOptions } from './basewindow'

class WindowManager {
  static instance: WindowManager

  winMap: Map<keyof typeof winMap, Electron.BrowserWindow> = new Map()
  constructor() {
    if (WindowManager.instance) {
      return WindowManager.instance
    }
    WindowManager.instance = this
  }

  getWin(name: keyof typeof winMap) {
    return this.winMap.get(name)
  }

  createWin(name: keyof typeof winMap, options: Partial<ConstrOptions> = {}) {
    if (this.winMap.has(name)) {
      /** 展示窗口 */
      this.showWin(name)
      return this.winMap.get(name)
    }

    const win = new Base({
      ...options,
      ...winMap[name],
      registEvents: [
        {
          type: 'once',
          channel: 'closed',
          callback: () => {
            console.log(`窗口 ${name} 关闭`)
            this.winMap.delete(name)
          },
        },
      ],
    })

    this.winMap.set(name, win)
  }

  showWin(name: keyof typeof winMap) {
    const win = this.winMap.get(name)
    if (win.isMinimized()) win.restore()
    win.focus()
  }

  closeWin(name: keyof typeof winMap) {
    const win = this.winMap.get(name)
    win?.close()
    this.winMap.delete(name)
  }

  closeAllWin() {
    this.winMap.forEach((win) => {
      win.close()
    })
    this.winMap.clear()
  }
}

export const windowManager = new WindowManager()

export default windowManager

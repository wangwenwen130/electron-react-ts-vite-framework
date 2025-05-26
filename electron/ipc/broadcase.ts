import { ipcMain, BrowserWindow } from 'electron'
import { windowManager, type WinMap } from 'ele/browserwindow'
export const initBroadcast = () => {
  ipcMain.on(
    '__broadcast__',
    (
      _e,
      channel: string,
      data: {
        channel: string
        winName?: WinMap
        args: unknown[]
      },
    ) => {
      const { winName, args } = data
      const send = (win: BrowserWindow) => win.webContents.send(channel, ...args)
      if (winName) {
        const win = windowManager.get(winName)
        win && send(win)
        !win && console.warn(`窗口 ${winName} 不存在 send msg &${channel} fail `)
        return
      }
      windowManager.for(send)
    },
  )
}

import { app, BrowserWindow } from 'electron'
import os from 'node:os'
import 'ele/services'
import windowManager from 'ele/browserwindow'
import { createTray } from './tray'
import { readyCheck } from './protocolawake'
import { initMainIPC } from 'ele/ipc'
import 'ele/ezdesk'

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

app.whenReady().then(() => {
  /** 优先注册ipc事件 */
  initMainIPC()
  createTray()
  readyCheck()
  windowManager.create('main')
})

app.on('window-all-closed', () => {
  windowManager.closeAll()
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  windowManager.show('main')
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    windowManager.create('main')
  }
})

import { Menu, Tray, app } from 'electron'
import path from 'node:path'
import { windowManager } from 'ele/browserwindow'
import { resourcePath } from 'ele/config'

export let willQuitApp = false

export const createTray = () => {
  const trayMenuTemplate = [
    {
      label: '显示',
      click: () => {
        windowManager.show('main')
      },
    },
    {
      label: '退出',
      click: () => {
        console.log('退出')
        willQuitApp = true
        app.quit()
      },
    },
  ]

  const appTray = new Tray(path.join(resourcePath, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  appTray.setToolTip('萤石远程桌面')
  appTray.setContextMenu(contextMenu)

  appTray.on('click', () => {
    if (windowManager.get('main')) windowManager.show('main')
  })

  app.on('window-all-closed', () => {
    appTray.destroy()
  })
}

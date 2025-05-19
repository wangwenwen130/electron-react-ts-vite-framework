import Store from 'electron-store'
import { isDev } from 'ele/config'
import { join } from 'node:path'
import { ipcMain } from 'electron'

const store = new Store({
  ...(isDev && { cwd: join(process.cwd(), 'debug') }),
  name: 'local_store',
})

export const watch = (key: string | Array<string>, callback: (value: any) => void) => {
  let unWatch = []
  if (Array.isArray(key)) {
    unWatch = key?.map((k) => store.onDidChange(k, callback))
  } else {
    unWatch.push(store.onDidChange(key, callback))
  }
  return () => {
    unWatch.forEach((u) => u())
  }
}

const initEvent = () => {
  ipcMain.handle('__store-get', (_, key) => {
    return store.get(key)
  })
  ipcMain.on('__store-set', (_, key, value) => {
    store.set(key, value)
  })
  ipcMain.on('__store-delete', (_, key) => {
    store.delete(key)
  })
}

initEvent()

export default store
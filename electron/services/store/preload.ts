import { ipcRenderer, contextBridge } from 'electron'

/** 配合electron-store 使用 */
/**
 * @param {string} key
 * @returns {Promise<any>}
 */

const localStore = {
  get: (key: string) => {
    return ipcRenderer.invoke('__store-get', key)
  },
  set: (key: string, val: any) => {
    ipcRenderer.send('__store-set', key, val)
  },
  delete: (key: string) => {
    ipcRenderer.send('__store-delete', key)
  },
}

contextBridge.exposeInMainWorld('localStore', localStore)

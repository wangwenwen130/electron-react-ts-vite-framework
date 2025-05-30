import { ipcRenderer, contextBridge } from 'electron'
import 'ele/services/store/preload'
import './load'
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipc', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  broadcast(...args: Parameters<typeof ipcRenderer.broadcast>) {
    ipcRenderer.send('__broadcast__', ...args)
  },
})

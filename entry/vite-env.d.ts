/// <reference types="vite/client" />

interface Window {
  ipcRenderer: import('electron').IpcRenderer
  localStore: import('localStore').Store
}

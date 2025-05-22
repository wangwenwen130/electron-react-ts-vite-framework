/// <reference types="vite/client" />

interface Window {
  ipc: import('electron').IpcRenderer
  localStore: import('localStore').Store
}

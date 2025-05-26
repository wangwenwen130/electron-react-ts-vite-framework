declare namespace Electron {
  interface IpcRenderer {
    broadcast(channel: string, config: { winName?: string; args: unknown[] }): void
    /** 浏览器main窗口唤醒通知 */
    on(channel: '__app-awake__', listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this
  }
}

import { EventBus } from '@/utils/eventbus'

export const localStore = window.localStore || {}

export class Broadcast extends EventBus {
  private channel: BroadcastChannel
  constructor(name: string) {
    super()
    this.channel = new BroadcastChannel(name)
    this.channel.onmessage = (e) => {
      const { channel, data } = e.data
      this.emit(channel, data)
    }
  }

  send(channel: string, data: any) {
    this.channel.postMessage({ channel, data })
  }

  on(event: string, listener: Function): void {
    super.on(event, listener)
  }
}

export const ipc = window.ipc || {}

// export class IPC extends EventBus {
//   private ipc = window.ipc || {}
//   constructor() {
//     super()
//   }

//   /** 所有进程广播数据，或者指定进程广播数据   接受数据用 on 方法 */
//   broadcast(...args: Parameters<typeof window.ipc.broadcast>) {
//     this.ipc.broadcast(...args)
//   }

//   on(...args: Parameters<typeof window.ipc.on>) {
//     const [channel, listener] = args
//     return this.ipc.on(channel, (event, ...args) => listener(event, ...args))
//   }

//   off(...args: Parameters<typeof window.ipc.off>) {
//     const [channel, ...omit] = args
//     return this.ipc.off(channel, ...omit)
//   }

//   send(...args: Parameters<typeof window.ipc.send>) {
//     const [channel, ...omit] = args
//     return this.ipc.send(channel, ...omit)
//   }

//   invoke(...args: Parameters<typeof window.ipc.invoke>) {
//     const [channel, ...omit] = args
//     return this.ipc.invoke(channel, ...omit)
//   }
// }
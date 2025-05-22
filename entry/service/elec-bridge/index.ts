import { EventBus } from '@/utils/eventbus'

export const ipc = window.ipc || {}
export const localStore = window.localStore || {}

class IPC extends EventBus {
  ipc = ipc
  constructor() {
    super()
    this.bindEvent()
  }

  bindEvent() {}
}

export default new IPC()

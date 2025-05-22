export class EventBus <T = string>{
  private events: Map<T, Array<Function>> = new Map()

  /**
   * 订阅事件
   * @param event 事件名称
   * @param listener 事件监听器
   */
  on(event: T, listener: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(listener)
  }

  /**
   * 触发事件并执行所有监听器
   * @param event 事件名称
   * @param args 传递给监听器的参数
   */
  emit(event: T, ...args: any[]): void {
    const listeners = this.events.get(event)
    if (listeners) {
      listeners.forEach((listener) => listener(...args))
    }
  }

  /**
   * 移除指定事件的监听器
   * @param event 事件名称
   * @param listener 需要移除的监听器（若不传则移除全部）
   */
  off(event: T, listener?: Function): void {
    const listeners = this.events.get(event)
    if (listeners) {
      if (listener) {
        this.events.set(
          event,
          listeners.filter((l) => l !== listener),
        )
      } else {
        this.events.delete(event)
      }
    }
  }

  once(event: T, listener: Function): void {
    const onceListener = (...args: any[]) => {
      this.off(event, onceListener)
      listener(...args)
    }
    this.on(event, onceListener)
  }
}

export default EventBus

import { Broadcast } from '@/service'

export let broadcast: Broadcast
export const useBroadcast = (chennel?: string) => {
  if (!chennel && !broadcast) throw new Error('🚀 ~ 当前进程还未创建请先创建 ~')
  if (!broadcast) {
    broadcast = new Broadcast(chennel!)
  }

  return broadcast
}

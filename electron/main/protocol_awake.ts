import { app } from 'electron'
import { windowManager } from 'ele/browser_window'
// app.removeAsDefaultProtocolClient('ezviz-control')
app.setAsDefaultProtocolClient('ezviz-control')

const ipcKey = '__app-awake__'
const handelAwake = (_e: Electron.Event, url: string) => {
  console.log("🚀 ~ 唤醒app -- handelAwake ~ url:", url)
  windowManager.getWebContents('main')?.send(ipcKey, url)
}

// macOS通过url schema启动
app.on('open-url', (event, url) => {
  handelAwake(event, decodeURI(url))
})

app.on('second-instance', (event, argv) => {
  handelAwake(event, decodeURI(argv[1]))
})

// 当应用启动完成后，主动判断应用是否是从网页中调起
export const readyCheck = () => {
  // windows如果是通过url schema启动则发出时间处理
  // 启动参数超过1个才可能是通过url schema启动
  if (process.argv.length > 1) {
    if (!app.isReady()) {
      app.once('browser-window-created', () => {
        // app 未打开时，通过 open-url打开 app，此时可能还没 ready，需要延迟发送事件
        // 此段ready延迟无法触发 service/app/ open-url 处理，因为saga初始化需要时间
        handelAwake(null, decodeURI(process.argv[1]))
      })
    } else {
      handelAwake(null, decodeURI(process.argv[1]))
    }
  }
}

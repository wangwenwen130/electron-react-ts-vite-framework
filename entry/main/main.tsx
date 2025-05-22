import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { store } from './store'
import { Provider } from 'react-redux'
import './i18n'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import  'main/assets/css/common.css';
import 'virtual:uno.css'
import '@/service';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>,
)

postMessage({ payload: 'removeLoading' }, '*')

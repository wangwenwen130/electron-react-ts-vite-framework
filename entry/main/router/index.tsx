import { createHashRouter } from 'react-router-dom'
import Home from 'main/pages/home'
import Layout from 'main/layout/index'
import Device from 'main/pages/device'
import Login from 'main/pages/login'
import Record from 'main/pages/record'
import Setting from 'main/pages/setting'

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/device',
        element: <Device />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/record',
        element: <Record />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
    ],
  },
])

export default router

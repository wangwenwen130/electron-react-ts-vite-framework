import { createHashRouter } from 'react-router-dom'
import Control from 'main/pages/control'
import Layout from 'main/pages/layout'
import Device from 'main/pages/device'
import Login from 'main/pages/login'
import Record from 'main/pages/record'
import Setting from 'main/pages/setting'
import Home from 'main/pages/home';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            index: true,
            element: <Control />,
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
      }
    ],
  },
])

export default router

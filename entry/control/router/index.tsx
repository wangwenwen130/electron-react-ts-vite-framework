import { createHashRouter } from 'react-router-dom'
import Home from 'main/pages/home'
import Layout from 'main/layout/index'

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      }
    ],
  },
])

export default router

import { createHashRouter } from 'react-router-dom'
import Home from 'main/page/home'
import Layout from 'main/layout/index'

export const router = createHashRouter(
  [
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
      ],
    },
  ]
)

export default router

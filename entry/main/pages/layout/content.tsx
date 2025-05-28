import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <div className="wh-full">
      <Outlet />
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { useBroadcast } from 'main/hooks'
import { useEffect } from 'react'

export default function Home() {
    
  useEffect(() => {
    useBroadcast('main')
    console.log('🚀 ~ broadcast init ~ chennel: main')
  }, [])

  return (
    <div className="wh-full">
      <Outlet />
    </div>
  )
}

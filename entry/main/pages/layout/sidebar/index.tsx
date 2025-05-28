import User from './user'
import Routerbar from './router_bar'

export default function Sidebar() {
  return (
    <div className="p-l-15 p-r-15">
      <User />
      <Routerbar />
    </div>
  )
}

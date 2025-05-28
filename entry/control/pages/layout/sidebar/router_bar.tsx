import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
export default function routerbar() {
  const { t } = useTranslation()

  const location = useLocation()
  const navigate = useNavigate()

  const routerList = [
    {
      title: t('remote_control.name'),
      icon: '',
      path: '/',
    },
    {
      title: t('device.name'),
      icon: '',
      path: '/device',
    },
    {
      title: t('control_record.name'),
      icon: '',
      path: '/record',
    },
    {
      title: t('setting.name'),
      icon: '',
      path: '/setting',
    },
  ]

  const loadPath = (path: string) => {
    console.log(path)
    navigate(path)
  }

  return (
    <div>
      {routerList.map((item) => {
        return (
          <div
            className="text-20 leading-28 p-12"
            key={item.path}
            style={location.pathname === item.path ? { backgroundColor: 'rgba(196,196,196,0.2)', borderRadius: '12px' } : {}}
            onClick={() => loadPath(item.path)}
          >
            {item.icon && <img className="w-32 h-32" src={item.icon} alt=""></img>}
            <span>{item.title}</span>
          </div>
        )
      })}
    </div>
  )
}

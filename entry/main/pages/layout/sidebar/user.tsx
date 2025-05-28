import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
export default function User() {
  const { t } = useTranslation()
  return (
    <div className="h-230 flex-col-c-c">
      <Avatar size={60} icon={<UserOutlined />} />
      <div className="text-20 mt-12">{t('login.not_login')}</div>
    </div>
  )
}

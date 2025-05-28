import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, message, Divider, Space, Switch, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import RecordList from './record_list'
import { copyText } from '@/utils'
import OpenControlModal from './open_control_modal'
import TempPasswordModal from './temp_password_modal'
import IptPWModal from './input_password_modal'
import { localStore } from '@/service'
import { getIsLogin, useAppSelector } from 'main/store'

export default function control() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deviceId, setDeviceId] = useState<string>('abscdf781')
  const [showdeviceId, setShowDeviceId] = useState(false)
  const [remotedeviceId, setRemoteDeviceId] = useState<string>('')
  const [useTempword, setUseTempword] = useState(false)
  const [showControlModal, setShowControlModal] = useState(false)
  const [showTempPasswordModal, setShowTempPasswordModal] = useState(false)

  const isLogin = useAppSelector(getIsLogin)

  useEffect(() => {
    localStore.get('use_temp_pw').then((res) => {
      setUseTempword(res)
    })
  }, [])
  const toRemote = () => {
    if (!isLogin) {
      Modal.confirm({
        title: t('remote_control.login_modal.title'),
        content: t('remote_control.login_modal.context'),
        onOk: () => navigate('/login'),
        onCancel: () => navigate('/login'),
        okText: t('login.login_now'),
        cancelText: t('login.register'),
        cancelButtonProps: { variant: 'outlined', color: 'primary' },
      })
    }
    console.log(remotedeviceId)
  }

  const copy = (text: string) =>
    copyText(text).then(() => {
      message.success(t('device.copy_success'))
    })

  const passwordChange = (check: boolean) => {
    if (check) return setShowControlModal(check)
    setUseTempword(check)
  }

  const inviteControl = () => {
    if (!useTempword) {
      Modal.confirm({
        title: t('remote_control.invite_control_tip'),
        onOk: () => {
          setShowControlModal(true)
        },
      })
    }
    // TODO: 邀请控制逻辑
  }

  return (
    <div className="flex-col pl-18 h-full text-20 overflow-hidden ">
      <div className="flex pt-58">
        <Input
          className="w-550 input-bg text-20"
          onChange={(e) => setRemoteDeviceId(e.target.value)}
          placeholder={t('remote_control.contron_placeholder')}
        />
        <Button type="primary" className="ml-28 h-60 min-w-164 text-20" onClick={toRemote}>
          {t('remote_control.name')}
        </Button>
      </div>
      <div className="h-[calc(100%-118px)] flex-col">
        <div className="h-[calc(100%-132px)]">
          <RecordList />
        </div>
        <Space
          size={30}
          className="mt-20 pl-34 pr-34 flex bg-#C4C4C4/20 h-112 rounded-12 mb-23 mr-28"
          split={<Divider type="vertical" style={{ height: '80px' }} />}
        >
          <div className="flex align-start">
            <div>{t('device.device_code')}：</div>
            <div className="ml-4">
              <div className="min-w-112">{showdeviceId ? deviceId : 'X'.repeat(deviceId.length)}</div>
              <div className="color-#2495FF text-14 pt-4">
                <span className="cursor-pointer" onClick={() => copy(deviceId)}>
                  {t('common.copy')}
                </span>
                <span className="ml-14 cursor-pointer" onClick={() => setShowDeviceId(!showdeviceId)}>
                  {!showdeviceId ? t('common.show') : t('common.hide')}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex-c-c">
              <span>{t('device.temp_password')}</span>
              <Switch
                className="ml-22"
                value={useTempword}
                onChange={(check) => {
                  localStore.set('use_temp_pw', check)
                  passwordChange(check)
                }}
              />
            </div>
            <div className="cursor-pointer color-#2495FF text-14 mt-4" onClick={() => setShowTempPasswordModal(true)}>
              {t('common.view')}
            </div>
          </div>
          <div className="cursor-pointer color-#2495FF ml-80" onClick={() => inviteControl()}>
            {t('remote_control.invite_control')}
          </div>
        </Space>
      </div>
      <OpenControlModal
        visivle={showControlModal}
        ok={() => {
          setUseTempword(true)
          setShowControlModal(false)
        }}
        cancel={() => setShowControlModal(false)}
      />
      <TempPasswordModal
        visivle={showTempPasswordModal}
        ok={() => setShowTempPasswordModal(false)}
        cancel={() => setShowTempPasswordModal(false)}
      />
      {/* <IptPWModal visivle={true} ok={() => {}} cancel={() => {}} /> */}
    </div>
  )
}

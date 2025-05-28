import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Space } from 'antd'
import dayjs from 'dayjs'
export default function recordList() {
  const { t } = useTranslation()
  const [deviceList, setDeviceList] = useState([
    {
      controlTime: Date.now(),
      username: 'xulingfeng',
      sys: 'macbook',
      deviceId: 'dsadfaf',
      during: 2 * 60 * 1000,
      /** 1 临时密码  2 安全密码   */
      passwordType: [1, 2] as (1 | 2)[],
    }
  ])

  const getPwText = (types: (1 | 2)[]) => {
    if (types.includes(1) && types.includes(2)) {
      return t('device.safe_password') + '+' + t('device.temp_password')
    } else if (types.includes(1)) {
      return t('device.temp_password')
    } else {
      return t('device.safe_password')
    }
  }

  const toRemote = (device) => {
    /**
     * 点击此按钮存在以下几种情况：
     * 1、设备安全密码、临时密码在有效范围内，直接发起控制，进入设备远程控制页面
     * 2、设备安全密码、临时密码不在有效范围内，直接弹出对一个密码输入弹窗，引导用户输入密码，校验成功后进入设备远程控制
     * 3、设备免密连接时，再次发起免密连接申请，等待用户同意后进入设备远程控制页面
     * 4、设备不在线，toast提示设备不在线
     * 5、设备在线，但是设备未开启被控
     */
  }

  const renderList = useCallback(() => {
    return deviceList.map((device) => {
      return (
        <div key={device.deviceId} className="w-260 bg-#F8F8F8 p-12 rounded-12">
          <div className="flex justify-between items-center">
            <img className="w-34 h-34" src="" alt="" />
            <span className="text-14 text-#686767">{dayjs(device.controlTime).format('YYYY/MM/DD hh:mm:ss')}</span>
          </div>
          <div className="mt-14 text-16">{device.username + '的' + device.sys}</div>
          <div className="text-16 mt-2">
            <span>{t('device.device_code')}：</span>
            <span className="font-600 ml-2">{device.deviceId}</span>
          </div>
          <div className="mt-28 flex mb-18">
            <div>
              <img className="w-16 h-16" src="" alt="" />
              <span className="text-14">{dayjs(device.during).format('mm′ss″')}</span>
            </div>
            <div className="ml-20">
              <img className="w-16 h-16" src="" alt="" />
              <span className="text-14">{getPwText(device.passwordType)}</span>
            </div>
          </div>
          <Button className="w-full mb-4 text-14" variant="outlined" color="primary" onClick={() => toRemote(device)}>
            {t('remote_control.name')}
          </Button>
        </div>
      )
    })
  }, [deviceList, t])

  return (
    <div className="mt-46 h-full">
      <div className="mb-16">最近被控设备（{deviceList.length}）</div>
      <div className="h-[calc(100%-90px)] scroll_wrap">
        <Space size={15} wrap={true}>
          {renderList()}
        </Space>
      </div>
    </div>
  )
}

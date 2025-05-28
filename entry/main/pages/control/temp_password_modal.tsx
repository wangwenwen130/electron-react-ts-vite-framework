import { Modal, Input, Button, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { useTempPassword } from 'main/hooks'
import React from 'react';

function tempPasswordModal({ visivle, ok, cancel }: { visivle: boolean; ok: () => void; cancel: () => void }) {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [isEdited, setIsEdited] = useState(false)
  const [isMatch, setIsMatch] = useState(false)
  const { tempPassword, tempPwUpType, updatePW, setPWUpdateType, validate } = useTempPassword()

  useEffect(() => {
    setPassword(tempPassword)
  }, [tempPassword])

  const onPasswordChange = (val: string) => {
    !validate(val) ? setIsMatch(true) : setIsMatch(false)
    setPassword(val)
  }

  const save = () => {
    if (!validate(password)) {
      setIsMatch(true)
    } else {
      setIsMatch(false)
      setIsEdited(false)
      updatePW(password)
    }
  }

  const editeRander = useCallback(() => {
    return (
      <div className="flex justify-between w-full">
        <Input
          className="h-42 input-bg text-20"
          value={password}
          maxLength={8}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <Button color="primary" variant="link" onClick={() => save()}>
          {t('common.complete')}
        </Button>
      </div>
    )
  }, [password, t, setPassword])

  const viewRander = useCallback(() => {
    return (
      <div className="flex justify-between w-full">
        <div className="text-20 h-42">{tempPassword}</div>
        <div>
          <Button color="primary" variant="link" onClick={() => updatePW()}>
            {t('common.refrash')}
          </Button>
          <Button className="ml-0 pl-0" color="primary" variant="link" onClick={() => setIsEdited(true)}>
            {t('common.edite')}
          </Button>
        </div>
      </div>
    )
  }, [tempPassword, t])

  const options = useCallback(() => {
    const opts = [
      {
        title: t('device.pw_modal.update_options.every_day'),
        value: 1,
      },
      {
        title: t('device.pw_modal.update_options.duiring_12'),
        value: 2,
      },
      {
        title: t('device.pw_modal.update_options.duiring_1'),
        value: 3,
      },
      {
        title: t('device.pw_modal.update_options.every_control'),
        value: 4,
      },
      {
        title: t('device.pw_modal.update_options.by_self'),
        value: 5,
      },
    ]
    return opts.map((item) => {
      return (
        <Select.Option key={item.value} value={item.value}>
          {item.title}
        </Select.Option>
      )
    })
  }, [t])

  return (
    <Modal title={t('device.temp_password')} open={visivle} width={355} onOk={() => ok()} onCancel={() => cancel()}>
      <div className="mt-30">
        <div className="flex">{isEdited ? editeRander() : viewRander()}</div>
        {isMatch && <div className="text-14 color-#FF1414">{t('device.pw_modal.err_tip')}</div>}
        <Select
          value={tempPwUpType}
          onChange={(value) => setPWUpdateType(value)}
          className="mt-20 w-full bg-#ECEBEB focus:bg-#ECEBEB hover:bg-#ECEBEB text-14"
        >
          {options()}
        </Select>
      </div>
    </Modal>
  )
}

export default React.memo(tempPasswordModal)

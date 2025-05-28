import { Modal } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

 function openControlModal({
  visivle,
  ok,
  cancel,
}: {
  visivle: boolean
  ok: () => void
  cancel: () => void
}) {
  const { t } = useTranslation()

  return (
    <Modal
      title={t('remote_control.open_control_modal.title')}
      open={visivle}
      onOk={() => ok()}
      onCancel={() => cancel()}
      okText={t('remote_control.open_control_modal.agree')}
      cancelText={t('remote_control.open_control_modal.disagree')}
    >
      <div className="mt-28 text-16">
        <div className="text-18 mb-18">{t('remote_control.open_control_modal.content.desc')}</div>
        <div className="mb-9">
          <div className="font-semibold">{t('remote_control.open_control_modal.content.device.title')}</div>
          <div>{t('remote_control.open_control_modal.content.device.desc')}</div>
        </div>
        <div className="mb-9">
          <div className="font-semibold">{t('remote_control.open_control_modal.content.file.title')}</div>
          <div>{t('remote_control.open_control_modal.content.file.desc')}</div>
        </div>
        <div className="mb-20">
          <div className="font-semibold">{t('remote_control.open_control_modal.content.privacy.title')}</div>
          <div>{t('remote_control.open_control_modal.content.privacy.desc')}</div>
        </div>
      </div>
    </Modal>
  )
}

export default React.memo(openControlModal)
import { Modal, Form, Input, Button } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTempPassword } from 'main/hooks'

interface Props {
  visivle: boolean
  ok: () => void
  cancel: () => void
}
const InputPasswordModal = ({ visivle, ok, cancel }: Props) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { validate } = useTempPassword()
  const requestControl = () => {}
  const control = () => {
    form
      .validateFields()
      .then(() => {
        console.log('test')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const tempValid = async (_, val: string) => {
    if (val) {
      console.log(val)
    } else {
    }
  }

  const safePWValid = async (_, val: string) => {
    console.log(val)
    if (validate(val)) {
    } else {
    }
  }

  return (
    <Modal
      open={visivle}
      title={t('remote_control.ipt_pw_modal.title')}
      width={432}
      onOk={control}
      okText={t('remote_control.ipt_pw_modal.use_pw_ctl')}
      onCancel={requestControl}
      cancelButtonProps={{
        variant: 'outlined',
        color: 'primary',
      }}
      cancelText={t('remote_control.ipt_pw_modal.req_ctl')}
    >
      <Form form={form} layout="vertical" className="mt-14 mb-18">
        <Form.Item name="tempPW" label={t('device.temp_password') + '：'} rules={[{ validator: tempValid }]}>
          <Input className="input-bg text-18" />
        </Form.Item>
        <Form.Item name="safePW" label={t('device.safe_password') + '：'} rules={[{ validator: safePWValid }]}>
          <Input className="input-bg text-18" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(InputPasswordModal)

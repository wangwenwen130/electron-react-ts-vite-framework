import { useAppDispatch, useAppSelector } from 'main/store'
import { setTempPassword, getTempPassword, setUpdateType, getTempPwType } from 'main/store/slices/secret_key'
import { generatePassword, validatePassword } from './generate_password'

export const useTempPassword = () => {
  const dispatch = useAppDispatch()
  const tempPassword = useAppSelector(getTempPassword)
  const tempPwUpType = useAppSelector(getTempPwType)

  const updatePW = (pw?: string) => {
    const password = pw ?? generatePassword()
    dispatch(setTempPassword(password))
  }

  const setPWUpdateType = (type: Device.TempPasswordUpdateType) => {
    dispatch(setUpdateType(type))
    updatePW()
  }

  return {
    tempPassword,
    tempPwUpType,
    updatePW,
    setPWUpdateType,
    validate: validatePassword,
  }
}

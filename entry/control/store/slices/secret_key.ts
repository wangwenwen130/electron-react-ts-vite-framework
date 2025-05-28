import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const initialState = {
  tempPassword: '',
  updateType: 1 as Device.TempPasswordUpdateType,
}

const secretKeySlice = createSlice({
  name: 'secretKey',
  initialState,
  reducers: {
    setTempPassword: (state, action: PayloadAction<string>) => {
      state.tempPassword = action.payload
    },
    setUpdateType: (state, action: PayloadAction<Device.TempPasswordUpdateType>) => {
      state.updateType = action.payload
    },
  },
})

export const { setTempPassword, setUpdateType } = secretKeySlice.actions

export const getTempPassword = (state: RootState) => state.secretKey.tempPassword
export const getTempPwType = (state: RootState) => state.secretKey.updateType

export default secretKeySlice.reducer

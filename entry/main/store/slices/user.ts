import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const initialState = {
  isLogin: false,
  useInfo: null as User.Info | null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User.Info | null>) => {
      state.useInfo = action.payload
      state.isLogin = action.payload ? true : false
    },
  },
})

export const { setUserInfo } = userSlice.actions

export const getUserInfo = (state: RootState) => state.user.useInfo
export const getIsLogin = (state: RootState) => state.user.isLogin

export default userSlice.reducer

import { configureStore, combineReducers, type ThunkAction, type Action } from '@reduxjs/toolkit'

import secretKey from './slices/secret_key'
export * from './slices/secret_key'
import user from './slices/user'
export * from './slices/user'

import { useDispatch, useSelector } from 'react-redux'

export const STATUS = {
  LOADING: 'LOADING',
  FULFILLED: 'FULFILLED',
  FAILED: 'FAILED',
} as const

export type FetchResult<T> = {
  status: keyof typeof STATUS
  message?: string
} & T

export const store = configureStore({
  reducer: combineReducers({
    secretKey,
    user,
  }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

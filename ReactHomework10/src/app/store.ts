import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import languageReducer from '../features/language/languageSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    order: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import aiReducer from '@/features/ai/aiSlice'

export const store = configureStore({
  reducer: { auth: authReducer, ai: aiReducer },
  devTools: import.meta.env.DEV,
})

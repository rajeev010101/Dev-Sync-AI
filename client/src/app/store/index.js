import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import aiReducer from '@/features/ai/aiSlice'
import uploadReducer from '@/features/uploads/uploadSlice'

export const store = configureStore({
  reducer: { auth: authReducer, ai: aiReducer, upload: uploadReducer },
  devTools: import.meta.env.DEV,
})

import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import aiReducer from '@/features/ai/aiSlice'
import notificationReducer from '@/features/notifications/notificationSlice'
import uploadReducer from '@/features/uploads/uploadSlice'

export const store = configureStore({
  reducer: { auth: authReducer, ai: aiReducer, notification: notificationReducer, upload: uploadReducer },
  devTools: import.meta.env.DEV,
})

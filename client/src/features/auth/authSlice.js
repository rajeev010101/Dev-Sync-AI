import { createSlice } from '@reduxjs/toolkit'

import { tokenStorage } from '@/services/tokenStorage'
import { login, logout, register } from '@/features/auth/authThunks'

const initialState = {
  accessToken: tokenStorage.getAccessToken(),
  user: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload
      state.accessToken = accessToken
      state.user = user ?? state.user
      state.status = 'authenticated'
      state.error = null
      tokenStorage.setAccessToken(accessToken)
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.user = null
      state.status = 'idle'
      state.error = null
      tokenStorage.clearAccessToken()
    },
    clearAuthError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(register.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(login.fulfilled, applySession)
      .addCase(register.fulfilled, applySession)
      .addCase(login.rejected, applyError)
      .addCase(register.rejected, applyError)
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null
        state.user = null
        state.status = 'idle'
        tokenStorage.clearAccessToken()
      })
  },
})

function applySession(state, action) {
  state.status = 'authenticated'
  state.accessToken = action.payload.accessToken
  state.user = action.payload.user ?? null
  tokenStorage.setAccessToken(action.payload.accessToken)
}

function applyError(state, action) {
  state.status = 'error'
  state.error = action.payload ?? 'Authentication failed.'
}

export const { clearAuthError, clearCredentials, setCredentials } = authSlice.actions
export default authSlice.reducer

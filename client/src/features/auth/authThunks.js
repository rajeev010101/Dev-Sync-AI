import { createAsyncThunk } from '@reduxjs/toolkit'

import { authAPI } from '@/features/auth/authAPI'

const getErrorMessage = (error) => error.response?.data?.message ?? error.message ?? 'Something went wrong.'
const normalizeSession = (payload) => ({
  accessToken: payload.accessToken ?? payload.token,
  user: payload.user ?? payload.data?.user,
})

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { return normalizeSession(await authAPI.login(credentials)) } catch (error) { return rejectWithValue(getErrorMessage(error)) }
})

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try { return normalizeSession(await authAPI.register(payload)) } catch (error) { return rejectWithValue(getErrorMessage(error)) }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try { await authAPI.logout() } catch (error) { return rejectWithValue(getErrorMessage(error)) }
})

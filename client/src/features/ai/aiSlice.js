import { createSlice } from '@reduxjs/toolkit'

const aiSlice = createSlice({
  name: 'ai',
  initialState: { activeChatId: null },
  reducers: {
    setActiveChat: (state, action) => { state.activeChatId = action.payload },
  },
})

export const { setActiveChat } = aiSlice.actions
export const selectActiveChatId = (state) => state.ai.activeChatId
export default aiSlice.reducer

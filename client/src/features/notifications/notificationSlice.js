import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawerOpen: false,
  statusFilter: 'all',
  typeFilter: 'all',
  searchTerm: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload
    },
    toggleDrawerOpen: (state) => {
      state.drawerOpen = !state.drawerOpen
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setDrawerOpen, setSearchTerm, setStatusFilter, setTypeFilter, toggleDrawerOpen } = notificationSlice.actions

export const selectNotificationDrawerOpen = (state) => state.notification.drawerOpen
export const selectNotificationStatusFilter = (state) => state.notification.statusFilter
export const selectNotificationTypeFilter = (state) => state.notification.typeFilter
export const selectNotificationSearchTerm = (state) => state.notification.searchTerm

export default notificationSlice.reducer

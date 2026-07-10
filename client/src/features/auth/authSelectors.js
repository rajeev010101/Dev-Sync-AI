export const selectAuth = (state) => state.auth
export const selectAccessToken = (state) => selectAuth(state).accessToken
export const selectCurrentUser = (state) => selectAuth(state).user
export const selectAuthStatus = (state) => selectAuth(state).status
export const selectAuthError = (state) => selectAuth(state).error
export const selectIsAuthenticated = (state) => Boolean(selectAccessToken(state))
export const selectCurrentUserRole = (state) => selectCurrentUser(state)?.role

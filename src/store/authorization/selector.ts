import { RootState } from '@store'

export const selectCurrentUser = (state: RootState) => state.authorization.user

export const selectIsLoggedIn = (state: RootState) => state.authorization.isLoggedIn

export const selectIsFinishedAuth = (state: RootState) => state.authorization.isFinishedAuth

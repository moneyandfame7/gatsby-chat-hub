import { LocalKey, localStore } from '@services/localstore'
import { User } from './type'
import { CookieKey, cookies } from '@services/cookies'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthorizationState {
  user: User | null
  isLoggedIn: boolean
  isFinishedAuth: boolean
}
const initialState: AuthorizationState = {
  user: localStore.get<User>(LocalKey.User),
  isLoggedIn: !!localStore.get<User>(LocalKey.User) && !!cookies.get(CookieKey.JwtAT) && !!cookies.get(CookieKey.JwtRT),
  isFinishedAuth: localStore.get<boolean>(LocalKey.AuthStatus) || false
}
export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
      localStore.set(LocalKey.User, payload)
    },

    setAuthStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isFinishedAuth = payload
      localStore.set(LocalKey.AuthStatus, payload)
    },
    removeUser: state => {
      state.user = null
    }
  }
})

export const { setUser, removeUser, setAuthStatus } = authorizationSlice.actions

export const authorizationReducer = authorizationSlice.reducer

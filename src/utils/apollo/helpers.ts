import jwtDecode from 'jwt-decode'

import { JwtPayload } from '@store/user/type'
import { userStore } from '@store/root'

export const getAccessToken = () => {
  const authTokenState = userStore.getState()
  const currentNumericDate = Math.round(Date.now() / 1000)

  if (!authTokenState.access && !authTokenState.refresh && !authTokenState.currentUser) {
    return null
  }
  if (authTokenState.access && currentNumericDate < jwtDecode<JwtPayload>(authTokenState.access).exp) {
    return authTokenState.access
  }
  return userStore.refreshAccessToken()
}

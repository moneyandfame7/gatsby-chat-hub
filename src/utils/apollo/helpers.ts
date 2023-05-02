import jwtDecode from 'jwt-decode'

import { JwtPayload } from '@store/authorization/type'
import { authorizationStore } from '@store/root'
import { Logger } from '@utils/logger'

export const getAccessToken = () => {
  const authTokenState = authorizationStore.getState()
  const currentNumericDate = Math.round(Date.now() / 1000)

  if (!authTokenState.access && !authTokenState.refresh && !authTokenState.currentUser) {
    Logger.error({ title: 'Unauthorized' })
    return null
  }
  if (authTokenState.access && currentNumericDate < jwtDecode<JwtPayload>(authTokenState.access).exp) {
    Logger.info({ title: 'All is ok' })
    return authTokenState.access
  }
  return authorizationStore.refreshAccessToken()
}

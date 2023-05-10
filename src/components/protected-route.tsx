/* lib */
import React, { FC, PropsWithChildren } from 'react'
import { navigate } from 'gatsby'
import { observer } from 'mobx-react-lite'

/* services */
import { useStores } from '@store/provider'
import { ROUTES } from '@utils/constants'

/* ui */

export const Protected: FC<PropsWithChildren> = observer(({ children }) => {
  const { authorizationStore, userStore } = useStores()
  if (!authorizationStore.isValidAccessToken) {
    ;(async () => {
      const data = await authorizationStore.refresh()
      if (!data?.accessToken) {
        navigate(ROUTES.login(), { replace: true })
      }
    })()
  }

  if (!authorizationStore.isLoggedIn || !userStore.user?.username) {
    navigate(ROUTES.login(), { replace: true })
    return null
  }

  return <>{children}</>
})

import React, { FC, PropsWithChildren, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'

import { useStores } from '@store/provider'
import { Routes } from './constants'

interface ProtectedRouteProps extends PropsWithChildren {}
export const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ children }) => {
  const { authorizationStore } = useStores()

  useEffect(() => {
    if (!authorizationStore.isLoggedIn) {
      navigate(Routes.Home)
    }
  }, [authorizationStore.isLoggedIn])

  return <>{children}</>
})

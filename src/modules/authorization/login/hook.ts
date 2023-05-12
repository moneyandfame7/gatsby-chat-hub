/* lib */
import { navigate } from 'gatsby'
import { useGoogleLogin } from '@react-oauth/google'

/* services */
import { useStores } from '@store/provider'
import { ROUTES } from '@utils/constants'
import { useState } from 'react'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { authorizationStore } = useStores()

  const login = useGoogleLogin({
    onSuccess: async creds => {
      setLoading(true)
      const { success } = await authorizationStore.login(creds)
      if (success) {
        setLoading(false)
        navigate(ROUTES.chat())
      }
    }
  })

  return {
    login,
    loading
  }
}

/* lib */
import { navigate } from 'gatsby'
import { useGoogleLogin } from '@react-oauth/google'

/* services */
import { useStores } from '@store/provider'
import { ROUTES } from '@utils/constants'

export const useLogin = () => {
  const { authorizationStore } = useStores()

  const login = useGoogleLogin({
    onSuccess: async creds => {
      const { success } = await authorizationStore.login(creds)
      if (success) {
        navigate(ROUTES.chat())
      }
    }
  })

  return {
    login
  }
}

import { useGoogleLogin } from '@react-oauth/google'
import { userStore } from '@store/root'
import { useEffect, useState } from 'react'

export const useAuthorization = () => {
  const { isAuthorized, login } = userStore
  const [username, setUsername] = useState('')
  const [inputError, setInputError] = useState('')

  const validateUsername = (username: string) => {
    const inLatinOnly = /^[A-Za-z]+$/
    if (username.length < 3) {
      setInputError('Username must be at least 3 characters long')
      return false
    }
    if (username.length > 30) {
      setInputError('Username cannot be longer than 30 characters')
      return false
    }
    if (!inLatinOnly.test(username)) {
      setInputError('English letters only')
      return false
    }
    setInputError('')
    return true
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async creds => {
      const { success } = await login(creds)
      if (success) {
        console.log('ok')
      }
    }
  })

  const submit = async () => {
    if (!inputError) {
      const { success } = await userStore.createUsername(username)
      if (success) {
        console.log('successfully')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUsername(value)
  }

  useEffect(() => {
    validateUsername(username)
  }, [username])

  return {
    inputError,
    submit,
    handleChange,
    googleLogin,
    isAuthorized
  }
}

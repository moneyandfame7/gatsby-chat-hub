import { rootStore } from '@store/root'

export const getAccessToken = () => {
  const { authorizationStore } = rootStore

  switch (true) {
    /* якщо немає токенів - повертаємо null */
    case !authorizationStore.isLoggedIn:
      return null

    /* якщо все гуд - просто повертаємо access token */
    case authorizationStore.isValidAccessToken:
      return authorizationStore.accessToken

    /* повертаємо рефрешнутий access token */
    default:
      return authorizationStore.refresh()
  }
}

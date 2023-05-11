export const ROUTES = {
  chat: (id?: string) => {
    if (id) {
      return `/c#${id}`
    }
    return '/c'
  },
  login: () => '/login'
}
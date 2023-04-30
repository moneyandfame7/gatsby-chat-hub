export enum LocalKey {
  User = 'user',
  AuthStatus = 'auth-st'
}
class LocalStorage {
  public get<T>(key: LocalKey) {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item) as T
  }

  public set<T>(key: LocalKey, value: T) {
    const serialized = JSON.stringify(value)

    localStorage.setItem(key, serialized)
  }
}

export const localStore = new LocalStorage()

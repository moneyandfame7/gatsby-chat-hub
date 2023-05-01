export enum LocalKey {
  User = 'user',
  AuthStatus = 'auth-st',
  AccessToken = 'ac-t',
  RefreshToken = 'rt-t'
}
export class LocalStorage {
  public get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item) as T
  }

  public set<T>(key: string, value: T): void {
    const serialized = JSON.stringify(value)

    localStorage.setItem(key, serialized)
  }

  public clear(key: string): void {
    localStorage.removeItem(key)
  }
}

export const localStore = new LocalStorage()

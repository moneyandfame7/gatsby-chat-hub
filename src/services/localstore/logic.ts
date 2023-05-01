export enum LocalKey {
  User = 'user',
  AuthStatus = 'auth-st'
}
export class LocalStorage {
  protected _localUserKey: LocalKey = LocalKey.User
  protected _localAuthStatusKey: LocalKey = LocalKey.AuthStatus

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
    this.set(key, null)
  }
}

export const localStore = new LocalStorage()

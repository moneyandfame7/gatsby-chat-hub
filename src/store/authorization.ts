import { makeAutoObservable, reaction } from 'mobx'

import { User } from './authorization/type'
import { LocalKey, localStore } from '@services/localstore'
import { FirebaseAuthorization } from '@services/authorization/config'

export class AuthorizationStore extends FirebaseAuthorization {
  private _user: User | null = null
  private _isFinishedAuth: boolean = false
  private _isLoggedIn: boolean = false
  private asdasd!: string
  constructor() {
    super()
    reaction(
      () => this._user?.username,
      username => console.log(username, ' has been changed username << ')
    )
    makeAutoObservable(this)
  }

  get user() {
    return this._user
  }

  get isFinishedAuth() {
    return this._isFinishedAuth
  }

  get isLoggedIn() {
    return this._isLoggedIn
  }

  public setUser(user: User): void {
    this._user = user
    localStore.set(LocalKey.User, user)
  }

  public removeUser(): void {
    this._user = null
    localStore.clear(LocalKey.User)
  }

  public setAuthStatus(status: boolean): void {
    this._isFinishedAuth = status
    localStore.set(LocalKey.AuthStatus, status)
  }

  public async login() {
    const user = await this.googleLogin()
    if (!user) {
      throw new Error('Error with Google authorization')
    }
    // const data = await gql`...`
    /* or just localStorage.set('tokens',data.tokens?) */
    // localStore.set('ac-t', data.access)
    // localStore.set('rf-t', data.access)

    // this.setUser(data.user)
  }
}

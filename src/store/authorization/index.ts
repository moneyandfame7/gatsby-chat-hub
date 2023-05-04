import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import jwtDecode from 'jwt-decode'

import { RootStore } from '@store/root'
import { client, secondaryClient } from '@utils/apollo/clients'
import type { NullableField } from '@types'

import { LOGIN_MUTATION, REFRESH_MUTATION } from './graphql'
import type {
  AccessToken,
  AuthInput,
  AuthResponse,
  AuthStoreOperationResponse,
  AuthStoreState,
  AuthStoreTokens,
  GoogleResponse,
  IAuthorizationStore,
  JwtPayload
} from './types'
import { UserStore } from '@store/user'

export class AuthorizationStore implements IAuthorizationStore {
  /* must be public for persist store */
  public accessToken: NullableField<string> = null
  public refreshToken: NullableField<string> = null
  private _loading: boolean = false

  private readonly userStore: UserStore
  private readonly STORAGE_KEY: string = 'authStore'
  // @TODO мейбі зробити loading в корневом store?
  constructor(readonly rootStore: RootStore) {
    /**
     * спочатку зробив ось так: this.rootStore.userStore.doSmth()
     * зараз: this.userStore.doSmth()
     */
    this.userStore = rootStore.userStore

    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['accessToken', 'refreshToken'],
      storage: typeof window !== undefined ? localStorage : undefined
    })
  }

  /* Getters */
  public get tokens(): AuthStoreTokens {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken }
  }
  public get isLoggedIn() {
    return !!this.refreshToken && !!this.rootStore.userStore.user
  }
  public get loading() {
    return this._loading
  }
  public get isValidAccessToken() {
    const currentNumericDate = Math.round(Date.now() / 1000)

    return this.accessToken && currentNumericDate < jwtDecode<JwtPayload>(this.accessToken).exp
  }

  /* Setters */
  private setAccessToken(token: NullableField<string>) {
    this.accessToken = token
  }
  private setRefreshToken(token: NullableField<string>) {
    this.refreshToken = token
  }
  private setTokens(values: NullableField<AuthStoreTokens>) {
    if (values) {
      this.setAccessToken(values.accessToken)
      this.setRefreshToken(values.refreshToken)
    } else {
      /* @TODO: показати, що я як даун годину намагався вирішити трабл*/
      this.setAccessToken(null)
      this.setRefreshToken(null)
    }
  }

  /* Auth operations */
  public async login(credentials: GoogleResponse): Promise<AuthStoreOperationResponse> {
    const { data, errors } = await client.mutate<AuthResponse<'login'>, AuthInput<'login'>>({
      mutation: LOGIN_MUTATION,
      variables: {
        loginInput: {
          token: credentials.access_token
        }
      }
    })
    if (data) {
      this.updateCredentials(data.login)
      return { success: true, error: null }
    }

    // @TODO handle errors from server
    return { success: false, error: 'Erorr with google authorization' }
  }

  public logout(): void {
    this.updateCredentials(null)
  }

  public async refresh(): Promise<NullableField<AccessToken>> {
    if (!this.refreshToken) {
      this.logout()
      return null
    }
    const { data, errors } = await secondaryClient.mutate<AuthResponse<'refresh'>, AuthInput<'refresh'>>({
      mutation: REFRESH_MUTATION,
      variables: {
        refreshInput: {
          token: this.refreshToken
        }
      }
    })
    if (data) {
      this.updateCredentials(data.refresh)

      return {
        accessToken: data.refresh.accessToken
      }
    }

    /* Handle error here */

    this.logout()
    return null
  }

  public updateCredentials(credentials: NullableField<AuthStoreState>) {
    if (credentials) {
      this.rootStore.userStore.setUser(credentials.user)
      this.setTokens({
        /* @TODO: розказати, як я змінив назву токенів з access, refresh до accessToken і refreshToken і теж хвилин 20 їбався */
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken
      })
    } else {
      /* @TODO: показати, що я як даун годину намагався вирішити трабл*/
      this.rootStore.userStore.setUser(null)
      this.setTokens(null)
    }
  }
}

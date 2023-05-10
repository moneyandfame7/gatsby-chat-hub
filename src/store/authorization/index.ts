/* lib */
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import jwtDecode from 'jwt-decode'

/* serivces  */
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
import { hasWindow } from '@utils/functions'

/**
 * @TODO handle error
 */

export class AuthorizationStore implements IAuthorizationStore {
  public accessToken: NullableField<string> = null
  public refreshToken: NullableField<string> = null

  private readonly STORAGE_KEY: string = 'authStore'
  constructor(readonly rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['accessToken', 'refreshToken'],
      storage: hasWindow() ? window.localStorage : undefined
    })
  }

  /* Getters */
  public get tokens(): AuthStoreTokens {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken }
  }
  public get isLoggedIn() {
    return !!this.refreshToken && !!this.rootStore.userStore.user
  }
  public get isValidAccessToken() {
    const currentNumericDate = Math.round(Date.now() / 1000)

    return !!this.accessToken && currentNumericDate < jwtDecode<JwtPayload>(this.accessToken).exp
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
    const { data } = await client.mutate<AuthResponse<'login'>, AuthInput<'login'>>({
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

    this.logout()
    return null
  }
  public updateCredentials(credentials: NullableField<AuthStoreState>) {
    if (credentials) {
      this.rootStore.userStore.setUser(credentials.user)
      this.setTokens({
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken
      })
    }
  }
}

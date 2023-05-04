import { TokenResponse } from '@react-oauth/google'
import { User } from '@store/user/type'
import { Nullable, NullableField } from '@types'

/* @TODO: переробити createUsername на confirmAuthorization */

export interface AuthStoreOperationResponse {
  success: boolean
  error: NullableField<string>
}

/* JWT tokens  */
export interface AccessToken {
  accessToken: string
}
export interface RefreshToken {
  refreshToken: string
}
export type AuthTokens = AccessToken & RefreshToken

/* Decoded user with Issued At and Expired Time */
export interface JwtPayload extends Omit<User, 'messages'> {
  iat: number
  exp: number
}

/* Response after refresh/login */
interface AuthResponseFields extends AuthTokens {
  user: User
}

/* Credentials after Google OAuth */
export type GoogleResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>

/* In Mobx Store and LocalStorage */
export type AuthStoreState = Nullable<AuthResponseFields>
export type AuthStoreTokens = Nullable<AuthTokens>

/* Login, refresh mutations */
export type AuthInput<T extends string> = {
  /**
   * @TODO переписати з інпутів на окремі зміні (token: String!)
   * loginInput: {...} || refreshInput: {...}
   */
  [key in T as `${key}Input`]: {
    token: string
  }
}

export type AuthResponse<T extends string> = {
  /**
   * data.login or data.refresh
   */
  [key in T]: AuthResponseFields
}

export interface IAuthorizationStore {
  accessToken: NullableField<string>
  refreshToken: NullableField<string>
  tokens: AuthStoreTokens
  isLoggedIn: boolean
  loading: boolean

  login: (credentials: GoogleResponse) => Promise<AuthStoreOperationResponse>
  logout: () => void
  refresh: () => Promise<NullableField<AccessToken>>
}

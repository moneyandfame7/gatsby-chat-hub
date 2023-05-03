import { TokenResponse } from '@react-oauth/google'

import { Nullable } from '@types'

export interface User {
  id: string
  email: string
  username: string | null
  displayName: string
  createdAt: Date
  photo: string

  /* @TODO: fix any */
  messages: any[]
}

export interface CreateUsernameInput {
  createUsernameInput: {
    username: string
  }
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface JwtPayload extends Omit<User, 'messages'> {
  iat: number
  exp: number
}

/* обʼєкт, який повертається після refresh/login */
interface AuthResponseFields extends AuthTokens {
  user: User
}

/* credentials, які повертаються після google oauth */
export type GoogleResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>

/**
 * authorizationStore + localStorage
 */
export type AuthLocalStore = Nullable<AuthResponseFields>
export type AuthLocalStoreTokens = Nullable<AuthTokens>

export type AuthInput<T extends string> = {
  /**
   * login, refresh приймають токени для валідації
   */
  [key in T as `${key}Input`]: {
    token: string
  }
}

export type AuthResponse<T extends string> = {
  /**
   * login, refresh - повертають токени і юзера
   */
  [key in T]: AuthResponseFields
}

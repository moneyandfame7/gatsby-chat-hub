import { gql } from '@apollo/client'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import type {
  AuthLocalStore,
  AuthResponse,
  GoogleResponse,
  AuthLocalStoreTokens,
  User,
  AuthInput,
  AuthTokens,
  CreateUsernameInput
} from './type'
import { client, secondaryClient } from '@utils/apollo/clients'

const userFragment = gql`
  fragment AllUserFields on User {
    id
    email
    displayName
    username
    photo
    createdAt
  }
`

const loginMutation = gql`
  mutation Login($loginInput: AuthInput!) {
    login(loginInput: $loginInput) {
      access
      refresh
      user {
        ...AllUserFields
      }
    }
  }
  ${userFragment}
`

const refreshAccessMutation = gql`
  mutation Refresh($refreshInput: AuthInput!) {
    refresh(refreshInput: $refreshInput) {
      access
      refresh
      user {
        ...AllUserFields
      }
    }
  }
  ${userFragment}
`

const createUsernameMutation = gql`
  mutation CreateUsername($createUsernameInput: CreateUsernameInput!) {
    createUsername(createUsernameInput: $createUsernameInput) {
      access
      refresh
      user {
        ...AllUserFields
      }
    }
  }
  ${userFragment}
`

export class UserStore {
  public currentUser: User | null = null
  public loading: boolean = false
  public access: string | null = null
  public refresh: string | null = null

  private readonly STORAGE_KEY: string = 'userStore'
  constructor() {
    /**
     * autoBind - щоб не губилось this і працювали традиційні функції
     */
    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['currentUser', 'access', 'refresh'],
      storage: localStorage
    })
  }

  private updateStore(options: AuthLocalStore | null) {
    if (options) {
      this.setUser(options.user)
      this.setTokens({ access: options.access, refresh: options.refresh })
    } else {
      this.setUser(null)
      this.setTokens({ access: null, refresh: null })
    }
  }

  /**
   * Authorization cases
   **/
  public async login(credentials: GoogleResponse) {
    if (!credentials) {
      return { success: false }
    }
    const { data, errors } = await client.mutate<AuthResponse<'login'>, AuthInput<'login'>>({
      mutation: loginMutation,
      variables: {
        loginInput: {
          token: credentials.access_token
        }
      }
    })

    if (data) {
      this.updateStore(data.login)

      return { success: true }
    }
    return { success: false }
  }

  public logout() {
    this.updateStore(null)
  }

  public getState() {
    return {
      currentUser: this.currentUser,
      ...this.getTokens()
    }
  }

  public async refreshAccessToken(): Promise<string | null> {
    if (!this.refresh) {
      this.logout()
      return null
    }

    const { data, errors } = await secondaryClient.mutate<AuthResponse<'refresh'>, AuthInput<'refresh'>>({
      mutation: refreshAccessMutation,
      variables: {
        refreshInput: {
          token: this.refresh
        }
      }
    })
    if (data) {
      this.updateStore(data.refresh)

      return data.refresh.access
    }
    this.logout()
    return null
  }

  private setTokens({ access, refresh }: AuthLocalStoreTokens) {
    this.access = access
    this.refresh = refresh
  }

  public getTokens(): AuthLocalStoreTokens {
    return {
      access: this.access,
      refresh: this.refresh
    }
  }

  public get isAuthorized() {
    return !!this.currentUser && !!this.access && this.refresh
  }

  /**
   * User manage
   **/
  public setUser(user: User | null): void {
    this.currentUser = user
  }

  public async createUsername(username: string) {
    try {
      const { data, errors } = await client.mutate<AuthResponse<'createUsername'>, CreateUsernameInput>({
        mutation: createUsernameMutation,
        variables: {
          createUsernameInput: {
            username
          }
        }
      })
      if (data) {
        this.updateStore(data.createUsername)

        return { success: true }
      }
      return { success: false }
    } catch (e) {
      return { success: false }
    }
  }
}

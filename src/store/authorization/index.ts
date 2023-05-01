import { gql } from '@apollo/client'
import { action, autorun, makeAutoObservable, makeObservable, observable } from 'mobx'

import { LocalKey, localStore } from '@services/localstore'
import { client } from '@utils/apollo'
import type { CreateUserInput, LoginResponse, User } from './type'
import { FirebaseAuthorization } from '@services/firebase'
import { makePersistable } from 'mobx-persist-store'

interface AuthorizationStoreInitialValues {
  currentUser: User | null
  isFinishedAuth: boolean
  isLoggedIn: boolean
}

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
  mutation Mutation($createUserInput: CreateUserInput!) {
    login(createUserInput: $createUserInput) {
      access
      refresh
      user {
        ...AllUserFields
      }
    }
  }
  ${userFragment}
`

const test = {
  storageKey: 'authStore',
  initialValues: {
    currentUser: null,
    isFinishedAuth: false,
    isLoggedIn: false
  }
}

export class AuthorizationStore {
  public currentUser: User | null = null
  public isFinishedAuth: boolean = false
  public isLoggedIn: boolean = false
  public loading: boolean = false

  private firebaseAuth: FirebaseAuthorization = new FirebaseAuthorization()
  private STORAGE_KEY: string = 'authStore'
  private initialValues = {
    currentUser: null,
    isLoggedIn: false,
    isFinishedAuth: false
  }
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['currentUser', 'isFinishedAuth', 'isLoggedIn'],
      storage: localStorage
    })
  }

  public setUser = (user: User): void => {
    this.currentUser = user
    localStore.set(LocalKey.User, user)
  }

  public removeUser = (): void => {
    this.currentUser = null
    localStore.clear(LocalKey.User)
  }

  public setAuthStatus = (status: boolean): void => {
    this.isFinishedAuth = status
    localStore.set(LocalKey.AuthStatus, status)
  }

  private setLoading = (value: boolean) => {
    this.loading = value
  }

  public login = async () => {
    const profile = await this.firebaseAuth.googleLogin()

    if (!profile) {
      throw new Error('Error with Google authorization')
    }

    const { data, errors } = await client.mutate<LoginResponse, CreateUserInput>({
      mutation: loginMutation,
      variables: {
        createUserInput: profile
      }
    })

    if (data) {
      console.log('DATA >>>>>>>', data)

      this.setUser(data.login.user)
      localStore.set(LocalKey.AccessToken, data.login.access)
      localStore.set(LocalKey.RefreshToken, data.login.refresh)

      return {
        success: true,
        errors: null,
        data
      }
    }
    return {
      success: false,
      errors,
      data
    }
  }
}

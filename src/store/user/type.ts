import type { AuthStoreOperationResponse } from '@store/authorization/types'
import type { NullableField } from '@types'

export interface User {
  id: string
  email: string
  username: NullableField<string>
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

export interface IUserStore {
  user: NullableField<User>
  loading: boolean
  STORAGE_KEY: string

  setUser: (user: NullableField<User>) => void
  createUsername: (username: string) => Promise<AuthStoreOperationResponse>
}

import type { NullableField } from '@types'
import type { Participant } from '@utils/graphql/conversations'

export interface User {
  id: string
  email: string
  username: NullableField<string>
  createdAt: Date
  photo: string

  /* @TODO: fix any */
  /* або не фікс, а прибрати, бо сам юзер буде приходити без звʼязків */
  messages: any[]
}

export interface UserOperationWithUsername {
  username: string
}

export interface CreateUsernameInput {
  username: string
}

export interface SearchUsersInput {
  username: string
}
export interface SearchUsersResponse {
  searchUsers: Array<Participant>
}

export interface IUserStore {
  user: NullableField<User>
  STORAGE_KEY: string

  setUser: (user: NullableField<User>) => void
}

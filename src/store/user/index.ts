import { autorun, makeAutoObservable, reaction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { client } from '@utils/apollo/clients'
import { RootStore } from '@store/root'
import type { NullableField } from '@types'
import type { AuthResponse } from '@store/authorization/types'

import { CREATE_USERNAME_MUTATION } from './graphql'
import type { User, CreateUsernameInput, IUserStore } from './type'
import { AuthorizationStore } from '@store/authorization'

export class UserStore implements IUserStore {
  public user: NullableField<User> = null
  public loading: boolean = false

  private readonly authorizationStore: AuthorizationStore
  public readonly STORAGE_KEY: string = 'userStore'
  constructor(readonly rootStore: RootStore) {
    this.authorizationStore = rootStore.authorizationStore
    /**
     * autoBind - щоб не губилось this і працювали традиційні функції
     */
    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['user'],
      storage: typeof window !== undefined ? localStorage : undefined
    })
  }
  public setUser(user: NullableField<User>): void {
    this.user = user
  }

  public async createUsername(username: string) {
    const { data, errors } = await client.mutate<AuthResponse<'createUsername'>, CreateUsernameInput>({
      mutation: CREATE_USERNAME_MUTATION,
      variables: {
        createUsernameInput: {
          username
        }
      }
    })
    if (data) {
      this.authorizationStore.updateCredentials(data.createUsername)

      return { success: true, error: null }
    }
    return { success: false, error: 'Sdsds' }
  }
}

import { SearchStore } from '@store/search'
import { AuthorizationStore } from '../authorization'
import { UserStore } from '../user'

import type { IRootStore } from './types'

export class RootStore implements IRootStore {
  public readonly userStore: UserStore
  public readonly authorizationStore: AuthorizationStore
  public readonly searchStore: SearchStore

  constructor() {
    this.userStore = new UserStore()
    this.authorizationStore = new AuthorizationStore(this)
    this.searchStore = new SearchStore()
  }
}

export const rootStore = new RootStore()

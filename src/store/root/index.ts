import { AuthorizationStore } from '../authorization'
import { UserStore } from '../user'

import type { IRootStore } from './types'

export class RootStore implements IRootStore {
  public readonly userStore: UserStore
  public readonly authorizationStore: AuthorizationStore

  constructor() {
    this.userStore = new UserStore()
    this.authorizationStore = new AuthorizationStore(this)
  }
}

export const rootStore = new RootStore()

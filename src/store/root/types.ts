import { AuthorizationStore } from '@store/authorization'
import { UserStore } from '@store/user'

export interface IRootStore {
  userStore: UserStore
  authorizationStore: AuthorizationStore
}

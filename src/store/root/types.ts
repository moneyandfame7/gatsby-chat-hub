import { AuthorizationStore } from '@store/authorization'
import { SearchStore } from '@store/search'
import { UserStore } from '@store/user'

export interface IRootStore {
  userStore: UserStore
  authorizationStore: AuthorizationStore
  searchStore: SearchStore
}

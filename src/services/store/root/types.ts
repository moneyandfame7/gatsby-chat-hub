import { AuthorizationStore } from '../authorization'
import { SearchStore } from '../search'
import { UserStore } from '../user'

export interface IRootStore {
	userStore: UserStore
	authorizationStore: AuthorizationStore
	searchStore: SearchStore
}

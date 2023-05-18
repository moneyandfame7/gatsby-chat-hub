import { AuthorizationStore } from '../authorization'
import { CacheStore } from '../cache'
import { SearchStore } from '../search'
import { UserStore } from '../user'

export interface IRootStore {
	userStore: UserStore
	authorizationStore: AuthorizationStore
	searchStore: SearchStore
	cacheStore: CacheStore
}

import { AuthorizationStore } from '../authorization'
import { CacheStore } from '../cache'
import { SearchStore } from '../search'
import { RightColumnUiStore } from '../ui/right-column'
import { UserStore } from '../user'
import type { IRootStore } from './types'

export class RootStore implements IRootStore {
	public readonly userStore: UserStore
	public readonly authorizationStore: AuthorizationStore
	public readonly searchStore: SearchStore
	public readonly cacheStore: CacheStore

	public readonly rightColumnUiStore: RightColumnUiStore
	public constructor() {
		this.userStore = new UserStore()
		this.authorizationStore = new AuthorizationStore(this)
		this.cacheStore = new CacheStore()
		this.searchStore = new SearchStore(this)

		this.rightColumnUiStore = new RightColumnUiStore()
	}
}

export const rootStore = new RootStore()

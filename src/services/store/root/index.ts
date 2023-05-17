import { AuthorizationStore } from '../authorization'
import { SearchStore } from '../search'
import { UserStore } from '../user'
import type { IRootStore } from './types'

export class RootStore implements IRootStore {
	public readonly userStore: UserStore
	public readonly authorizationStore: AuthorizationStore
	public readonly searchStore: SearchStore

	public constructor() {
		this.userStore = new UserStore()
		this.authorizationStore = new AuthorizationStore(this)
		this.searchStore = new SearchStore()
	}
}

export const rootStore = new RootStore()

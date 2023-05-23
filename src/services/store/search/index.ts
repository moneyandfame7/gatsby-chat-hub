import { throttle } from 'lodash'
import { makeAutoObservable, toJS } from 'mobx'

import { client } from '@services/apollo/clients'

import { Participant } from '@utils/graphql/conversations'

import { RootStore } from '../root'
import { SEARCH_USERS } from '../user/graphql'
import { SearchUsersInput, SearchUsersResponse } from '../user/type'

type SearchName = 'contacts' | 'global'
type SearchOptions = {
	type: SearchName
	query: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttledSearch = <T extends (...args: any[]) => void>(func: T) => {
	return throttle(func, 800, { leading: false })
}

export interface SearchResult {
	users: Participant[]
	global: []
}

export class SearchStore {
	public readonly initialState: SearchResult = {
		users: [],
		global: [],
	}
	public state: SearchResult = this.initialState
	public isLoading = false

	public constructor(public readonly rootStore: RootStore) {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	public executeSearchQuery = ({ type, query }: SearchOptions) => {
		switch (type) {
			case 'global':
				this.searchByQueryGlobal(query)
				break
		}
	}
	public clear() {
		this.setLoading(false)
		this.state = this.initialState
	}
	private setLoading = (status: boolean): void => {
		this.isLoading = status
	}
	public selectResult = <T>(selector: (search: SearchResult) => T) => {
		return selector(toJS(this.state))
	}

	public searchByQueryGlobal = throttledSearch((query: string) => {
		this.setLoading(true)

		setTimeout(() => {
			this.setLoading(false)
		}, 500)
	})

	public searchUsers = throttledSearch(async (query: string) => {
		this.setLoading(true)
		const { data } = await client.query<SearchUsersResponse, SearchUsersInput>({
			query: SEARCH_USERS,

			variables: {
				username: query,
			},
		})

		this.setLoading(false)
		this.setUsers(data.searchUsers)
	})
	public setUsers = (result: Participant[]) => {
		this.state.users = result
	}
}

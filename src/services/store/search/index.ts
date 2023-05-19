import { useMemo } from 'react'

import { throttle } from 'lodash'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

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

// const throttledSearch <T extends (...args: any[])>(func:T)=>{}

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

	public clear() {
		this.setLoading(false)
		this.state = this.initialState
	}
	private setLoading = (status: boolean): void => {
		this.isLoading = status
	}
	public selectResult = <T>(selector: (cache: SearchResult) => T) => {
		return selector(toJS(this.state))
	}

	public searchByQueryGlobal = throttledSearch((query: string) => {
		console.log('[GLOBAL QUERY]:', query)
		this.setLoading(true)
		/**
		 * @TODO debounce
		 */
		setTimeout(() => {
			this.setLoading(false)
		}, 500)
	})

	public searchByContacts = throttledSearch((query: string) => {
		console.log('[CONTACTS QUERY]: ', query)
	})

	/* Users  */
	public searchUsers = throttledSearch(async (query: string) => {
		console.log(`[USERS QUERY]:`, query)
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

	public executeSearchQuery = ({ type, query }: SearchOptions) => {
		switch (type) {
			case 'contacts':
				this.searchByContacts(query)
				break
			case 'global':
				this.searchByQueryGlobal(query)
				break
		}
	}
}

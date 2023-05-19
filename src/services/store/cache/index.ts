import { uniqBy } from 'lodash'
import { configure, makeAutoObservable, toJS } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { client } from '@services/apollo/clients'

import { hasWindow } from '@utils/functions'
import { Conversation, Participant } from '@utils/graphql/conversations'

import type { User } from '../user/type'

interface GlobalCache {
	currentUser?: User
	recentSearchedUsers: Participant[]
	conversations: Conversation[]
}

const initialState: GlobalCache = {
	recentSearchedUsers: [],
	conversations: [],
}
const MAX_LENGTH = 20

export const selectConversationById = (id: string) => (state: GlobalCache) =>
	state.conversations.find((c) => c.id === id)

export class CacheStore {
	public globalCache: GlobalCache = initialState

	public constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		configure({
			useProxies: 'never',
		})
		makePersistable(this, {
			name: 'ch-global-cache',
			properties: ['globalCache'],
			storage: hasWindow() ? window.localStorage : undefined,
		})
	}

	public clear = async () => {
		await client.clearStore()
		this.globalCache = initialState
	}

	public selectCache = <T>(selector: (cache: GlobalCache) => T) => {
		return selector(toJS(this.globalCache))
	}

	public updateRecentUsers(payload: Participant[]) {
		const merged = [...payload, ...this.globalCache.recentSearchedUsers]
		const sliced = merged.slice(0, MAX_LENGTH)
		this.globalCache.recentSearchedUsers = uniqBy(sliced, 'id')
	}

	public updateConversations(payload: Conversation[]) {
		this.globalCache.conversations = payload
	}

	public updateConversationById(payload: Conversation) {
		const withoutUpdated = this.globalCache.conversations.filter((c) => c.id !== payload.id)
		this.globalCache.conversations = [...withoutUpdated, payload]
	}
}

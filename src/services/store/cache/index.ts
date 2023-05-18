import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { client } from '@services/apollo/clients'

import { hasWindow } from '@utils/functions'
import { Conversation } from '@utils/graphql/conversations'

import type { User } from '../user/type'

interface Message {}

interface GlobalCache {
	currentUser?: User
	users?: {
		recentSearchedById?: string[]
		byId: Record<string, User>
		data: User[]
	}
	conversations?: {
		byId?: Record<string, Conversation>
		data?: Conversation[]
	}
	messages?: {
		byChatId?: Record<string, Message>
	}
}

export class CacheStore {
	public globalCache: GlobalCache | Record<string, never> = {}
	public constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		makePersistable(this, {
			name: 'ch-global-cache',
			properties: ['globalCache'],
			storage: hasWindow() ? window.localStorage : undefined,
		})
	}
	public clear = async () => {
		await client.clearStore()
		this.globalCache = {}
	}

	public update = async (state: Partial<GlobalCache>) => {
		this.globalCache = {
			...this.globalCache,
			...state,
		}
	}
}

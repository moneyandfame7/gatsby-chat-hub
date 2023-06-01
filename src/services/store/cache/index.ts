import { uniqBy } from 'lodash'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { client } from '@services/apollo/clients'

import { LinkMetadata } from '@containers/middle/message'

import { hasWindow } from '@utils/functions'
import { Conversation, Participant } from '@utils/graphql/conversations'
import { Message } from '@utils/graphql/message'

import type { User } from '../user/type'

type CachedMessageContent = Omit<Message, 'conversation'>

export interface CachedMessage {
	content: CachedMessageContent
	meta?: LinkMetadata
	conversationId: string
}
interface GlobalCache {
	currentUser?: User
	animationsEnabled: boolean
	recentSearchedUsers: Participant[]
	conversations: Conversation[]
	messages: Record<string, CachedMessage | never>
	rtl: boolean
}

const initialState: GlobalCache = {
	recentSearchedUsers: [],
	conversations: [],
	animationsEnabled: true,
	messages: {},
	rtl: false,
}

interface UpdateCachedMessage {
	conversationId: string
	message: CachedMessage
}
interface UpdateOneMessageById {
	id: string
	message: Partial<CachedMessage>
}
interface AddOneMessageById {
	id: string
	message: CachedMessage
}
const MAX_LENGTH = 20

export const selectConversationById = (id: string) => (state: GlobalCache) =>
	state.conversations.find((c) => c.id === id)

export const selectMessagesByConversationId = (id: string) => (state: GlobalCache) =>
	Object.values(state.messages).filter((m) => m.conversationId === id)

export const selectMessageById = (id: string) => (state: GlobalCache) => state.messages[id]

export class CacheStore {
	public globalCache: GlobalCache = initialState

	public constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, {
			name: 'ch-global-cache',
			properties: ['globalCache'],
			storage: hasWindow() ? window.localStorage : undefined,
		})
	}

	public async clear() {
		await client.clearStore()
		runInAction(() => {
			this.globalCache = initialState
		})
	}

	public selectCache<T>(selector: (cache: GlobalCache) => T) {
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

	public updateMessageById(payload: UpdateOneMessageById) {
		const message = this.selectCache(selectMessageById(payload.id))
		if (!message) {
			throw new Error(`Message with id ${payload.id} not found in storage!`)
		}
		this.globalCache.messages = {
			...this.globalCache.messages,
			[payload.id]: {
				...message,
				...payload.message,
			},
		}
	}

	public addMessageById(payload: AddOneMessageById) {
		this.globalCache.messages = {
			...this.globalCache.messages,
			[payload.id]: payload.message,
		}
	}

	public toggleAnimations() {
		this.globalCache.animationsEnabled = !this.globalCache.animationsEnabled
	}

	public toggleDirection() {
		this.globalCache.rtl = !this.globalCache.rtl
	}
}

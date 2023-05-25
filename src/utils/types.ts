import type { LeftColumnUiStore } from '@services/store'

import { Conversation, Participant } from '@utils/graphql/conversations'

export type NullableObj<T> = { [K in keyof T]: T[K] | null }

export type NullableField<T> = T | null

export interface PropsWithConversation {
	conversation: Conversation
}

export interface PropsWithParticipants {
	participants: Participant[]
}

export interface PropsWithLeftColumnStore {
	leftColumnUiStore: LeftColumnUiStore
}

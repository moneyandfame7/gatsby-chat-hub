import { gql } from '@apollo/client'
import { DocumentNode } from 'graphql'

import { AvatarVariants } from '@services/actions/ui/conversations'

import type { NullableField } from '@utils/types'

/**
 * Отримати список розмов, де є поточний юзер
 * */
export interface Participant {
	id: string
	username: string
	photo: string
}
export interface LastMessage {
	text: string
	sender: Participant
	createdAt: Date
	updatedAt: Date
}
export interface Conversation {
	id: string
	lastMessage: NullableField<LastMessage>
	createdAt: Date
	name: string
	description?: string
	avatarVariant?: AvatarVariants
	/* Count of unread messages */
	unreadMessages: number
	participants: Participant[]
}

/* Fragments */

export const PARTICIPANT_FRAGMENT: DocumentNode = gql`
	fragment ParticipantFields on User {
		id
		photo
		username
	}
`

export const CONVERSATION_FRAGMENT: DocumentNode = gql`
	${PARTICIPANT_FRAGMENT}
	fragment ConversationFields on Conversation {
		id
		unreadMessages
		createdAt
		name
		description
		avatarVariant
		lastMessage {
			text
			updatedAt
			createdAt
			sender {
				...ParticipantFields
			}
		}
		participants {
			...ParticipantFields
		}
	}
`

/* Query */
export interface ConversationsData {
	conversations: Conversation[]
}
export const CONVERSATIONS_QUERY: DocumentNode = gql`
	${CONVERSATION_FRAGMENT}
	query GetMyConversations {
		conversations {
			...ConversationFields
		}
	}
`

export interface ConversationByIdData {
	conversation: Conversation
}
export interface ConversationByIdInput {
	id: string
}
export const CONVERSATION_ID_QUERY: DocumentNode = gql`
	query ConversationById($id: String!) {
		conversation(id: $id) {
			id
			createdAt
			name
			createdAt
			unreadMessages
			avatarVariant
			description
			messages {
				id
				isRead
				sender {
					...ParticipantFields
				}
				text
				updatedAt
			}
			participants {
				...ParticipantFields
			}
		}
	}
	${PARTICIPANT_FRAGMENT}
`

/* Subscriptions */
export interface ConversationCreatedSubscriptionData {
	data: {
		conversationCreated: Conversation
	}
}
export const CONVERSATION_CREATED_SUBSCRIPTION: DocumentNode = gql`
	${CONVERSATION_FRAGMENT}
	subscription ConversationCreated {
		conversationCreated {
			...ConversationFields
		}
	}
`

/* Mutation */
export interface CreateConversationResponse {
	createConversation: {
		conversationId: string
	}
}
export interface CreateConversationInput {
	createConversationInput: {
		participantsIds: string[]
		name: string
		description?: string
	}
}
export const CREATE_CONVERSATION: DocumentNode = gql`
	mutation CreateConversation($createConversationInput: CreateConversationInput) {
		createConversation(createConversationInput: $createConversationInput) {
			conversationId
		}
	}
`

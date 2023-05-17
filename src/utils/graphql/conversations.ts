import { gql } from '@apollo/client'
import { NullableField } from '@types'
import { DocumentNode } from 'graphql'

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
  participantsIds: string[]
}
export const CREATE_CONVERSATION: DocumentNode = gql`
  mutation CreateConversation($participantsIds: [String]) {
    createConversation(participantsIds: $participantsIds) {
      conversationId
    }
  }
`

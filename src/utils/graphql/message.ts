import type { User } from '@services/store/user/type'

import type { Conversation } from './conversations'

export interface Message {
	id: string
	text: string
	createdAt: Date
	updatedAt: Date
	conversation: Conversation
	sender: User
}

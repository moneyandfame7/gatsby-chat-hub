import { User } from '@services/store/user/type'

export interface GlobalState {
	currentUser?: User
}
export interface CreateConversationProps {
	participantsIds: string[]
	name: string
	description?: string
}

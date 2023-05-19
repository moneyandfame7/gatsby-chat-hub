import { client } from '@services/apollo/clients'
import { User } from '@services/store/user/type'

import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'

type CreateConversationProps = {
	participantsIds: string[]
	name: string
	description?: string
}

type GlobalState = {
	currentUser?: User
}
export function createConversation(
	state: GlobalState,
	{ participantsIds, name, description }: CreateConversationProps
) {
	const { currentUser } = state
	if (!currentUser) {
		return
	}

	const withCurrentUserId = [currentUser.id, ...participantsIds]
	return client.mutate<CreateConversationResponse, CreateConversationInput>({
		mutation: CREATE_CONVERSATION,
		variables: {
			createConversationInput: {
				participantsIds: withCurrentUserId,
				name,
				description,
			},
		},
	})
}

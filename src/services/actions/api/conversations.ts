import { client } from '@services/apollo/clients'
import type { CreateConversationParams } from '@services/types/api'

import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'

export function createConversation({ participantsIds, name, description }: CreateConversationParams) {
	return client.mutate<CreateConversationResponse, CreateConversationInput>({
		mutation: CREATE_CONVERSATION,
		variables: {
			createConversationInput: {
				participantsIds,
				name,
				description,
			},
		},
	})
}

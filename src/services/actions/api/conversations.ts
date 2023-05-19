import { client } from '@services/apollo/clients'
import type { CreateConversationProps } from '@services/types/api'

import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'

export function createConversation({ participantsIds, name, description }: CreateConversationProps) {
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

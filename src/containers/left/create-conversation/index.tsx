import React from 'react'

import { useMutation } from '@apollo/client'
import { Box } from '@chakra-ui/react'

import { useStores } from '@services/store'

import { LeftColumnUI } from '@containers/left/settings'

import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'

interface ConversationModalProps extends LeftColumnUI {
	onOpen?: () => void
	isOpen?: boolean
	onClose?: () => void
	toggle?: () => void
}

export const CreateConversation: React.FC<ConversationModalProps> = ({
	leftColumnUiStore,
	onClose,
	onOpen,
	isOpen,
	toggle,
}) => {
	/* step 2 */
	const { userStore } = useStores()

	const [createConversation, { loading: createConversationLoading }] = useMutation<
		CreateConversationResponse,
		CreateConversationInput
	>(CREATE_CONVERSATION)

	// const onCreateConversation = async () => {
	// 	const participantsIds = [userStore.user!.id, ...participants.map((p) => p.id)]
	// 	try {
	// 		const { data } = await createConversation({
	// 			variables: {
	// 				participantsIds,
	// 			},
	// 		})

	// 		if (!data?.createConversation) {
	// 			throw new Error('Failed to create conversation')
	// 		}
	// 		const {
	// 			createConversation: { conversationId },
	// 		} = data
	// 		/* @TODO: переробити це */
	// 		navigate(`/c#${conversationId}`)
	// 		/**
	// 		 * Clear state on successfull creation
	// 		 */
	// 		// setUsername('')
	// 		// setParticipants([])
	// 		onClose && onClose()
	// 	} catch (e: any) {
	// 		// eslint-disable-next-line no-console
	// 		console.warn(e)
	// 	}
	// }
	return (
		<>
			<Box bg='red' minH='50vh' minW='300px'>
				asdfasdfl
			</Box>
		</>
	)
}

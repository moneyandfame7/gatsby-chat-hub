import React, { useEffect, useState } from 'react'

import { useLazyQuery, useMutation } from '@apollo/client'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Center, Checkbox, HStack, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDebounce } from '@services/hooks'
import { useDebounceQuery } from '@services/hooks/useDebounceQuery'
import { LeftColumnContent, useStores } from '@services/store'
import { SEARCH_USERS } from '@services/store/user/graphql'
import { SearchUsersInput, SearchUsersResponse } from '@services/store/user/type'

import { Animation } from '@ui/animation'
import { Scrollable } from '@ui/overlay'
import { ListItem } from '@ui/shared/list-item'
import { Loader, SecondaryLoader } from '@ui/shared/loaders'

import { LeftColumnUI } from '@containers/left/settings'

import {
	CREATE_CONVERSATION,
	CreateConversationInput,
	CreateConversationResponse,
	Participant,
} from '@utils/graphql/conversations'

import { LeftGoBack } from '../go-back'
import { ProvideInformation } from './provide-information'
import { SelectParticipants } from './select-participants'

interface ConversationModalProps extends LeftColumnUI {
	onOpen?: () => void
	isOpen?: boolean
	onClose?: () => void
	toggle?: () => void
}

interface CreateConversationGoNextProps {
	onClick: () => void
}
export const CreateConversationGoNext: React.FC<CreateConversationGoNextProps> = ({ onClick }) => {
	return (
		<Animation.Scale>
			<IconButton
				onClick={onClick}
				bg='primary'
				_hover={{
					bg: 'primary',
				}}
				icon={<ArrowRightIcon color='#fff' />}
				aria-label='Go next step'
			/>
		</Animation.Scale>
	)
}

export const CreateConversation: React.FC<ConversationModalProps> = observer(
	({ leftColumnUiStore, onClose, onOpen, isOpen, toggle }) => {
		const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([])

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

		const selectParticipant = (selected: Participant) => {
			if (selectedParticipants.includes(selected)) {
				setSelectedParticipants((prev) => prev.filter((p) => p.id !== selected.id))
			} else {
				setSelectedParticipants((prev) => [selected, ...prev])
			}
		}

		const handleGoBack = () => {
			leftColumnUiStore.handleResetContent()
		}

		const renderContent = () => {
			switch (leftColumnUiStore.content) {
				case LeftColumnContent.NewConversationStep1:
					return (
						<SelectParticipants
							handleGoBack={handleGoBack}
							key={LeftColumnContent.NewConversationStep1}
							participants={selectedParticipants}
							leftColumnUiStore={leftColumnUiStore}
							selectParticipant={selectParticipant}
						/>
					)
				case LeftColumnContent.NewConversationStep2:
					return (
						<ProvideInformation
							leftColumnUiStore={leftColumnUiStore}
							handleGoBack={handleGoBack}
							key={LeftColumnContent.NewConversationStep2}
							participants={selectedParticipants}
						/>
					)
				default:
					return null
			}
		}
		return (
			<Animation.Slide bg='white' left={0} top={0} bottom={0} pos='absolute' width='100%' height='100%'>
				<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
			</Animation.Slide>
		)
	}
)

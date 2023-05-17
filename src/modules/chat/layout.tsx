/* lib */
import React, { type FC, type PropsWithChildren, createContext } from 'react'

import { HStack, useDisclosure } from '@chakra-ui/react'

/* services  */
import { ProtectedRoute } from '@modules/authentication'

import { LeftColumn } from '@containers/left'

import { ConversationInformation } from './information'

interface ConversationContextValues {
	isConversationOpen: boolean
	onConversationClose: () => void
	onConversationOpen: () => void

	isConversationCreateOpen: boolean
	onConversationCreateOpen: () => void
	onConversationCreateClose: () => void

	isInfoOpen: boolean
	toggleInfo: () => void
}

/**
 * @todo винести це в mobx store
 */

export const ConversationContext = createContext<ConversationContextValues>({} as ConversationContextValues)

export const ConversationLayout: FC<PropsWithChildren> = ({ children }) => {
	const { isOpen: isConversationOpen, onClose: onConversationClose, onOpen: onConversationOpen } = useDisclosure()
	const { isOpen: isInfoOpen, onToggle: toggleInfo } = useDisclosure()
	const {
		isOpen: isConversationCreateOpen,
		onClose: onConversationCreateClose,
		onOpen: onConversationCreateOpen,
	} = useDisclosure()

	return (
		<ConversationContext.Provider
			value={{
				isConversationOpen,
				onConversationClose,
				onConversationOpen,
				isInfoOpen,
				toggleInfo,
				isConversationCreateOpen,
				onConversationCreateClose,
				onConversationCreateOpen,
			}}
		>
			<ProtectedRoute>
				<HStack>
					<LeftColumn />
					{children}
					<ConversationInformation />
				</HStack>
			</ProtectedRoute>
		</ConversationContext.Provider>
	)
}

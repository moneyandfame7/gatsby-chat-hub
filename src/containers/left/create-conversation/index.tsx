import React, { useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { LeftColumnContent } from '@services/store'

import { Animation } from '@components/animation'

import { WithLeftColumnStore } from '@containers/left/settings'

import { Participant } from '@utils/graphql/conversations'

import { ProvideInformation } from './provide-information'
import { SelectParticipants } from './select-participants'

interface ConversationModalProps extends WithLeftColumnStore {}

export const CreateConversation: React.FC<ConversationModalProps> = observer(({ leftColumnUiStore }) => {
	const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([])

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
})

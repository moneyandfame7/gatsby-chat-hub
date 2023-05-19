import React, { useState } from 'react'

import { navigate } from 'gatsby'

import { Box, FormControl, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { createConversation } from '@services/actions/api/conversations'
import { LeftColumnContent, useStores } from '@services/store'

import { Animation } from '@ui/animation'
import { Scrollable } from '@ui/overlay'
import { ListItem } from '@ui/shared/list-item'

import { ROUTES } from '@utils/constants'
import { PropsWithParticipants } from '@utils/types'

import { CreateConversationGoNext } from '.'
import { LeftGoBack } from '../go-back'
import { LeftColumnUI } from '../settings'

interface ProvideInformationProps extends PropsWithParticipants {
	handleGoBack: () => void
}
export const ProvideInformation: React.FC<ProvideInformationProps & LeftColumnUI> = ({
	participants,
	handleGoBack,
	leftColumnUiStore,
}) => {
	const { userStore, authorizationStore } = useStores()
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}

	const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.currentTarget.value)
	}

	const handleSubmit = async () => {
		if (!userStore.user) {
			authorizationStore.logout()
			return
		}

		const response = await createConversation({
			participantsIds: [userStore.user.id, ...participants.map((p) => p.id)],
			name,
			description,
		})
		if (response?.data) {
			leftColumnUiStore.setContent(LeftColumnContent.Conversations)
			navigate(ROUTES.chat(response.data.createConversation.conversationId))
		}
	}

	return (
		<Animation.Slide bg='white' height='100%' pos='absolute' top={0} left={0} bottom={0} w='full' zIndex={1} p={4}>
			<HStack>
				<LeftGoBack onClick={handleGoBack} />
				<Text flex={1} fontSize='xl' fontWeight={500}>
					Provide information
				</Text>
				<AnimatePresence initial={false}>
					{participants.length > 1 && name.length === 0 ? null : <CreateConversationGoNext onClick={handleSubmit} />}
				</AnimatePresence>
			</HStack>
			<VStack justifyContent={participants.length < 2 ? 'start' : 'space-around'} height='calc(100% - 40px)'>
				{participants.length > 1 && (
					<VStack gap={2}>
						<Input variant='outline' placeholder='Conversation name' size='lg' onChange={handleChangeName} />
						<VStack w='full' gap={0.1}>
							<Input
								variant='outline'
								placeholder='Description ( optional )'
								size='lg'
								onChange={handleChangeDescription}
							/>
							<Text color='text.secondary' fontSize='14px'>
								You can provide an optional description for your channel.
							</Text>
						</VStack>
					</VStack>
				)}
				<Box w='full'>
					<Text fontWeight={500} color='text.secondary' my={2}>
						{participants.length} {participants.length > 1 ? 'members' : 'member'}{' '}
					</Text>
					<Scrollable height='430px' width='100%'>
						{participants.map((p) => (
							<ListItem
								key={p.id}
								avatar={{
									src: p.photo,
								}}
								title={p.username}
								isHoverable={false}
							/>
						))}
					</Scrollable>
				</Box>
			</VStack>
		</Animation.Slide>
	)
}

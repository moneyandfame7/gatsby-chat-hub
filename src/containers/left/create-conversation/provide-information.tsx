import React, { useState } from 'react'

import { navigate } from 'gatsby'

import { Box, Divider, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { createConversation } from '@services/actions/api/conversations'
import { LeftColumnContent, useStores } from '@services/store'

import { Animation } from '@components/animation'
import { ColumnHeader } from '@components/column-header'
import { Scrollable } from '@components/overlay'
import { ListItem } from '@components/shared/list-item'

import { ROUTES } from '@utils/constants'
import { PropsWithParticipants } from '@utils/types'

import { LeftGoBack } from '../go-back'
import { WithLeftColumnStore } from '../settings'
import { CreateConversationGoNext } from './go-next-button'

interface ProvideInformationProps extends PropsWithParticipants {
	handleGoBack: () => void
}
export const ProvideInformation: React.FC<ProvideInformationProps & WithLeftColumnStore> = ({
	participants,
	handleGoBack,
	leftColumnUiStore,
}) => {
	const { userStore, authorizationStore, cacheStore } = useStores()
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
		<Animation.Fade bg='white' height='100%' pos='absolute' top={0} left={0} bottom={0} w='full' zIndex={1}>
			<ColumnHeader mb={2}>
				<LeftGoBack onClick={handleGoBack} />
				<Text flex={1} fontSize='xl' fontWeight={500}>
					Provide information
				</Text>
				<AnimatePresence initial={false}>
					{participants.length > 1 && name.length === 0 ? null : <CreateConversationGoNext onClick={handleSubmit} />}
				</AnimatePresence>
			</ColumnHeader>
			<VStack px={4} justifyContent={participants.length < 2 ? 'start' : 'space-around'} height='calc(100% - 80px)'>
				{participants.length > 1 && (
					<VStack gap={2}>
						<Input
							variant='outline'
							placeholder='Conversation name'
							size='lg'
							borderWidth='2px'
							borderRadius='18px'
							_focusVisible={{ borderColor: 'primary' }}
							onChange={handleChangeName}
						/>
						<VStack w='full' gap={0.1}>
							<Input
								variant='outline'
								placeholder='Description ( optional )'
								borderWidth='2px'
								borderRadius='18px'
								_focusVisible={{ borderColor: 'primary' }}
								size='lg'
								onChange={handleChangeDescription}
							/>
							<Text color='text.secondary' fontSize='14px'>
								You can provide an optional description for your channel.
							</Text>
						</VStack>
					</VStack>
				)}
				<Box w='full' h='400px'>
					<Text fontWeight={500} color='text.secondary' my={2}>
						{participants.length} {participants.length > 1 ? 'members' : 'member'}{' '}
					</Text>
					<Divider />
					<Scrollable height='calc(100% - 43px)' width='100%'>
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
		</Animation.Fade>
	)
}

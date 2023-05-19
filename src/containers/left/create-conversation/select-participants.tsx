import React, { useEffect, useMemo, useState } from 'react'

import { ArrowRightIcon } from '@chakra-ui/icons'
import { Center, HStack, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { uniqBy } from 'lodash'
import { observer } from 'mobx-react-lite'

import { useSelectSearchUsers } from '@services/actions/search'
import { LeftColumnContent, useStores } from '@services/store'

import { Animation } from '@ui/animation'
import { Scrollable } from '@ui/overlay'
import { ListItem } from '@ui/shared/list-item'
import { SecondaryLoader } from '@ui/shared/loaders'

import { LeftColumnUI } from '@containers/left/settings'

import { Participant } from '@utils/graphql/conversations'
import { PropsWithParticipants } from '@utils/types'

import { CreateConversationGoNext } from '.'
import { LeftGoBack } from '../go-back'

interface ConversationModalProps extends LeftColumnUI {
	participants: Participant[]
	handleGoBack: () => void
	selectParticipant: (p: Participant) => void
}

const SearchList: React.FC<
	PropsWithParticipants & { selectParticipant: (p: Participant) => void; searchList: Participant[] }
> = ({ participants, searchList, selectParticipant }) => {
	return (
		<Scrollable height='calc(100% - 112px)' width='100%' p={3}>
			{searchList.map((u) => (
				<Animation.Fade
					key={u.id}
					layout
					onClick={() => {
						selectParticipant(u)
					}}
					zIndex={1}
					cursor='pointer'
				>
					<ListItem
						subtitle='last seen in'
						avatar={u.photo}
						title={u.username}
						withCheckbox
						isChecked={participants.some((p) => p.id === u.id)}
					/>
				</Animation.Fade>
			))}
		</Scrollable>
	)
}
export const SelectParticipants: React.FC<ConversationModalProps> = observer(
	({ leftColumnUiStore, participants, selectParticipant, handleGoBack }) => {
		const { searchStore, cacheStore } = useStores()

		const [searchedUsers, setSearchedUsers] = useState<Participant[]>([])
		const [username, setUsername] = useState<string>('')

		const newSearchResult = useSelectSearchUsers(searchStore)

		useEffect(() => {
			if (newSearchResult.length > 0) {
				cacheStore.updateRecentUsers(newSearchResult)
				setSearchedUsers(newSearchResult)
			}
			return () => {
				searchStore.clear()
			}
		}, [newSearchResult])
		const handleChangeUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
			setUsername(e.currentTarget.value)
		}

		useEffect(() => {
			if (Boolean(username)) {
				;(async () => {
					await searchStore.searchUsers(username)
				})()
			} else {
				setSearchedUsers(cacheStore.selectCache((cache) => cache.recentSearchedUsers))
			}
		}, [username])

		const renderContent = () => {
			switch (true) {
				case searchStore.isLoading:
					return (
						<Center height='100%'>
							<SecondaryLoader size='40px' />
						</Center>
					)
				case username.length > 0 && newSearchResult.length === 0 && !searchStore.isLoading:
					return <Center height='100%'>Nothing found</Center>
				case username.length === 0 && searchedUsers.length > 0:
					return (
						<SearchList
							searchList={uniqBy([...participants, ...searchedUsers], 'id')}
							participants={participants}
							selectParticipant={selectParticipant}
						/>
					)
				case searchedUsers.length > 0:
					return (
						<SearchList participants={participants} searchList={searchedUsers} selectParticipant={selectParticipant} />
					)
				default:
					return null
			}
		}

		const handleGoNextStep = () => {
			leftColumnUiStore.setContent(LeftColumnContent.NewConversationStep2)
		}

		return (
			<Animation.Scale height='100%' pos='absolute' left={0} top={0} bottom={0} width='100%'>
				<HStack p={4}>
					<LeftGoBack onClick={handleGoBack} />
					<Text flex={1} fontSize='xl' fontWeight={500}>
						Add Participants
					</Text>
					<AnimatePresence initial={false}>
						{participants.length > 0 && <CreateConversationGoNext onClick={handleGoNextStep} />}
					</AnimatePresence>
				</HStack>
				<InputGroup>
					<Input
						onChange={handleChangeUsername}
						pl={3}
						variant='flushed'
						placeholder='Who would you like to add?'
						_placeholder={{ fontSize: 16 }}
						focusBorderColor='#9BA0FD'
					/>
					<AnimatePresence initial={false}>
						{searchStore.isLoading && (
							<Animation.Fade>
								<InputRightElement>
									<SecondaryLoader />
								</InputRightElement>
							</Animation.Fade>
						)}
					</AnimatePresence>
				</InputGroup>
				{renderContent()}
			</Animation.Scale>
		)
	}
)

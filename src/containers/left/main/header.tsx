/* lib  */
import React, { useCallback, useEffect } from 'react'

import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useNetworkStatus } from '@services/hooks'
import { useStores } from '@services/store'
import { LeftColumnContent } from '@services/store/ui/left-column'

import { ColumnHeader, LeftGoBack, SearchInput } from '@components'

import type { PropsWithLeftColumnStore } from '@utils/types'

import { LeftDropdownMenu } from '../menu'

interface LeftMainHeaderProps extends PropsWithLeftColumnStore {}
export const LeftMainHeader: React.FC<LeftMainHeaderProps> = observer(({ leftColumnUiStore }) => {
	const { authorizationStore, searchStore } = useStores()
	const { isFetching, isOnline } = useNetworkStatus()

	const searchInputPlaceholder =
		leftColumnUiStore.content === LeftColumnContent.Contacts ? 'Search contacts' : 'Search (⌘K)'

	const isSearchInputFocused =
		leftColumnUiStore.content === LeftColumnContent.Contacts ||
		leftColumnUiStore.content === LeftColumnContent.GlobalSearch

	const handleLogoutSelect = useCallback(async () => {
		await authorizationStore.logout()
	}, [])

	const handleFocusInput = useCallback(() => {
		if (leftColumnUiStore.content !== LeftColumnContent.GlobalSearch) {
			leftColumnUiStore.setContent(LeftColumnContent.GlobalSearch)
		}
	}, [])

	const handleNewChatSelect = useCallback(() => {
		leftColumnUiStore.setContent(LeftColumnContent.NewConversationStep1)
	}, [])

	const handleGoBack = useCallback(() => {
		leftColumnUiStore.handleResetContent()
	}, [])

	const handleSearchQuery = useCallback(
		(query: string) => {
			if (!Boolean(query)) {
				return
			}
			if (leftColumnUiStore.content === LeftColumnContent.Contacts) {
				searchStore.executeSearchQuery({ type: 'contacts', query })
				return
			}

			searchStore.executeSearchQuery({ type: 'global', query })
		},
		[leftColumnUiStore.content, searchStore.executeSearchQuery]
	)

	const renderContent = useCallback(() => {
		switch (leftColumnUiStore.content) {
			case LeftColumnContent.Conversations:
				return <LeftDropdownMenu onLogOutSelect={handleLogoutSelect} onNewChatSelect={handleNewChatSelect} />
			default:
				return <LeftGoBack onClick={handleGoBack} />
		}
	}, [leftColumnUiStore.content])
	return (
		<ColumnHeader>
			<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
			<SearchInput
				width='90%'
				isLoading={isFetching || !isOnline}
				loaderStatus={!isOnline ? 'offline' : 'fetching'}
				isFocused={isSearchInputFocused}
				handleFocus={handleFocusInput}
				handleChange={handleSearchQuery}
				placeholder={searchInputPlaceholder}
			/>
		</ColumnHeader>
	)
})

/* lib  */
import React, { useCallback } from 'react'

import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useApolloNetworkStatus } from '@services/apollo/clients'
import useNetworkStatus from '@services/hooks/useNetworkStatus'
import { useStores } from '@services/store'
import { LeftColumnContent } from '@services/store/ui/left-column'

import { ColumnHeader } from '@components/column-header'
import { SearchInput } from '@components/shared/search-input'

import { LeftGoBack } from '../go-back'
import { LeftDropdownMenu } from '../menu'
import { WithLeftColumnStore } from '../settings'

interface LeftMainHeaderProps extends WithLeftColumnStore {}
export const LeftMainHeader: React.FC<LeftMainHeaderProps> = observer(({ leftColumnUiStore }) => {
	const { authorizationStore, searchStore } = useStores()

	const searchInputPlaceholder =
		leftColumnUiStore.content === LeftColumnContent.Contacts ? 'Search contacts' : 'Search (⌘K)'

	const isSearchInputFocused =
		leftColumnUiStore.content === LeftColumnContent.Contacts ||
		leftColumnUiStore.content === LeftColumnContent.GlobalSearch

	const isLoading = useApolloNetworkStatus().numPendingQueries > 0
	const isOnline = useNetworkStatus()

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
				isLoading={isLoading || !isOnline}
				isFocused={isSearchInputFocused}
				handleFocus={handleFocusInput}
				handleChange={handleSearchQuery}
				placeholder={searchInputPlaceholder}
			/>
		</ColumnHeader>
	)
})

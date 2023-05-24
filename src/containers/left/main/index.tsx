import React, { useCallback } from 'react'

import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { LeftColumnContent } from '@services/store'

import { Animation } from '@components/animation'
import { Scrollable } from '@components/overlay'

import { WithLeftColumnStore } from '../settings'
import { ContactList } from './contacts'
import { Conversations } from './conversations'
import { LeftMainHeader } from './header'
import { LeftSearch } from './search'

interface LeftMainProps extends WithLeftColumnStore {}

export const LeftMain: React.FC<LeftMainProps> = observer(({ leftColumnUiStore }) => {
	const renderContent = useCallback(() => {
		switch (leftColumnUiStore.content) {
			case LeftColumnContent.Conversations:
				return <Conversations key={LeftColumnContent.Conversations} />
			case LeftColumnContent.GlobalSearch:
				return <LeftSearch leftColumnUiStore={leftColumnUiStore} key={LeftColumnContent.GlobalSearch} />
			case LeftColumnContent.Contacts:
				return <ContactList key={LeftColumnContent.Contacts} />
			default:
				return null
		}
	}, [leftColumnUiStore.content])

	return (
		<Animation.Scale display='flex' flexDirection='column' height='100%' pos='relative'>
			<LeftMainHeader leftColumnUiStore={leftColumnUiStore} />
			<Scrollable pos='relative' id='LeftWrapper' height='100%' width='100%' overflowY='scroll'>
				<AnimatePresence initial={false}>{renderContent()}</AnimatePresence>
			</Scrollable>
		</Animation.Scale>
	)
})

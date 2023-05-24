import React from 'react'

import { Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'
import { RightColumnContent } from '@services/store/ui/right-column'

import { ColumnHeader } from '@components/column-header'
import { CloseIcon } from '@components/icons'
import { IconButton } from '@components/shared/buttons'
import { SearchInput } from '@components/shared/search-input'

export const RightHeader: React.FC = observer(() => {
	const { rightColumnUiStore } = useStores()
	const handleClose = () => {
		rightColumnUiStore.reset()
	}

	const renderContent = () => {
		switch (rightColumnUiStore.content) {
			case RightColumnContent.Information:
				return <Text flex={1}>Conversation info</Text>
			case RightColumnContent.MessagesSearch:
				return (
					<SearchInput
						handleChange={(value) => {
							console.log(value)
						}}
						handleFocus={() => {
							console.log('focus')
						}}
						placeholder='Search'
						isFocused
						isLoading={false}
					/>
				)
		}
	}
	return (
		<ColumnHeader>
			<IconButton icon={<CloseIcon />} onClick={handleClose} aria-label='Close column' />
			{renderContent()}
		</ColumnHeader>
	)
})

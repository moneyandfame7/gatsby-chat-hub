import React, { useEffect } from 'react'

import { Box, ResponsiveValue, position } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useLayout } from '@services/hooks'
import { useStores } from '@services/store'
import { RightColumnContent } from '@services/store/ui/right-column'

import { CloseIcon } from '@components/icons'
import { IconButton } from '@components/shared/buttons'

import { ContainerIndex } from '@utils/constants'

export const RightColumn: React.FC = observer(() => {
	const { rightColumnUiStore } = useStores()
	const { isDesktop, isMobile } = useLayout()

	useEffect(() => {
		const handlePressEscape = (e: KeyboardEvent) => {
			/* e.repeat for prevent keydown holding */
			if ((e.code === 'Escape' || e.key === 'Escape') && !e.repeat && rightColumnUiStore.isOpen) {
				e.stopPropagation()
				rightColumnUiStore.close()
			}
		}

		document.addEventListener('keydown', handlePressEscape, true)

		return () => {
			document.removeEventListener('keydown', handlePressEscape, true)
		}
	}, [])

	const renderContent = () => {
		switch (rightColumnUiStore.content) {
			case RightColumnContent.Information:
				return <Box>Info</Box>
			case RightColumnContent.MessagesSearch:
				return <Box>Search</Box>
		}
	}

	const handleClose = () => {
		rightColumnUiStore.close()
	}

	const test = () => {
		switch (true) {
			case isDesktop:
				return {
					width: '300px',
					bg: 'orange',
					zIndex: ContainerIndex.Right,
				}
			case isMobile:
				return {
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					width: '100vw',
					bg: 'green',
					zIndex: ContainerIndex.Right,
				}
			default:
				return {
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					width: '300px',
					bg: 'blue',
					zIndex: ContainerIndex.Right,
				}
		}
	}
	return (
		<Box bg='red' height='100vh' margin='0px !important' hidden={!rightColumnUiStore.isOpen} {...(test() as any)}>
			<IconButton icon={<CloseIcon />} onClick={handleClose} aria-label='Close column' />
			{renderContent()}
		</Box>
	)
})

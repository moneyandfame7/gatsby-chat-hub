/* lib  */
import React, { useEffect } from 'react'

import { Box, BoxProps, Portal } from '@chakra-ui/react'

interface BackdropProps extends BoxProps {
	handler: (e: KeyboardEvent) => void
}
export const Backdrop: React.FC<BackdropProps> = ({ handler, ...props }) => {
	useEffect(() => {
		document.addEventListener('keydown', handler, true)

		return () => {
			document.removeEventListener('keydown', handler, true)
		}
	}, [])
	return (
		<Portal>
			<Box
				id='Backdrop'
				// zIndex={20}
				data-component-name='Backdrop'
				pos='fixed'
				left='0'
				top='0'
				bottom='0'
				right='0'
				w='100vw'
				height='100vh'
				{...props}
			/>
		</Portal>
	)
}

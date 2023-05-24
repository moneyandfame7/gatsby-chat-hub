import React, { PropsWithChildren, useEffect, useState } from 'react'

import { Center } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { SecondaryLoader } from '@components/shared/loaders'

import { Animation } from './animation'

export const ClientOnly: React.FC<PropsWithChildren> = ({ children }) => {
	const [domLoaded, setDomLoaded] = useState(false)
	useEffect(() => {
		setDomLoaded(true)
	}, [])

	return (
		<AnimatePresence>
			{domLoaded ? (
				<Animation.Fade key='Root'>{children}</Animation.Fade>
			) : (
				<Animation.Fade key='Root2'>
					<Center key='Loader' height='100vh' bg='white'>
						<SecondaryLoader size='40px' />
					</Center>
				</Animation.Fade>
			)}
		</AnimatePresence>
	)
}

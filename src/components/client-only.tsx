import React, { PropsWithChildren, useEffect, useState } from 'react'

import { Center } from '@chakra-ui/react'

import { SecondaryLoader } from '@components/shared/loaders'

export const ClientOnly: React.FC<PropsWithChildren> = ({ children }) => {
	const [domLoaded, setDomLoaded] = useState(false)
	useEffect(() => {
		setDomLoaded(true)
	}, [])

	return (
		<>
			{domLoaded ? (
				children
			) : (
				<Center height='100vh' bg='white'>
					<SecondaryLoader size='40px' />
				</Center>
			)}
		</>
	)
}

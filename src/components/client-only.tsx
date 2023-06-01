import React, { PropsWithChildren, useEffect, useState } from 'react'

import { AnimatePresence } from 'framer-motion'

import { Animation } from './animation'

export const ClientOnly: React.FC<PropsWithChildren> = ({ children }) => {
	const [domLoaded, setDomLoaded] = useState(false)
	useEffect(() => {
		setTimeout(() => {
			setDomLoaded(true)
		}, 50)
	}, [])

	return (
		<AnimatePresence initial={false}>
			{domLoaded ? <Animation.Fade key='Root'>{children}</Animation.Fade> : null}
		</AnimatePresence>
	)
}

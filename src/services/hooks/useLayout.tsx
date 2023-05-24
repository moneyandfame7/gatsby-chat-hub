import { useEffect, useState } from 'react'

import { useMediaQuery } from '@chakra-ui/react'

export const useLayout = () => {
	const [isMobile, setIsMobile] = useState(false)
	const [isDesktop, setIsDesktop] = useState(false)
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)

	const is = useMediaQuery('(max-width: 768px)')[0]
	const isD = useMediaQuery('(min-width: 1280px)')[0]

	useEffect(() => {
		const isOv = Boolean(document.getElementById('Backdrop'))
		setIsOverlayOpen(isOv)
	}, [])

	useEffect(() => {
		setIsMobile(is)
		setIsDesktop(isD)
	}, [is, isD])
	return { isMobile, isDesktop, isOverlayOpen }
}

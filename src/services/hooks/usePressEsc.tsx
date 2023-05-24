import { useEffect } from 'react'

import { getIsOverlayOpen } from '@services/actions/ui'

export const usePressEsc = (handler: () => void) => {
	useEffect(() => {
		const handlePressEscape = (e: KeyboardEvent) => {
			const isOverlayOpen = getIsOverlayOpen()
			if (!isOverlayOpen && (e.code === 'Escape' || e.key === 'Escape') && !e.repeat) {
				e.stopPropagation()
				handler()
			} else if (isOverlayOpen) {
				console.log('[OVERLAY IS OPEN!❌🧹]')
			}
		}

		document.addEventListener('keydown', handlePressEscape, true)

		return () => {
			document.removeEventListener('keydown', handlePressEscape, true)
		}
	}, [])
}

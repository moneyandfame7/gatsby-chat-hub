import { useEffect, useState } from 'react'

import { useApolloNetworkStatus } from '@services/apollo/clients'

export const useNetworkStatus = () => {
	const [isOnline, setIsOnline] = useState(window.navigator.onLine)
	const { numPendingMutations, numPendingQueries } = useApolloNetworkStatus()

	useEffect(() => {
		function handleChange() {
			setIsOnline(window.navigator.onLine)
		}

		window.addEventListener('online', handleChange)
		window.addEventListener('offline', handleChange)

		return () => {
			window.removeEventListener('offline', handleChange)
			window.removeEventListener('online', handleChange)
		}
	}, [])

	return { isOnline, isFetching: numPendingMutations > 0 || numPendingQueries > 0 }
}

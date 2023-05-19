import { useEffect, useState } from 'react'

export const useThrottle = <T>(value: T, delay: number): T => {
	const [throttledValue, setThrottledValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setThrottledValue(value)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return throttledValue
}

import { useStores } from '@services/store'

export const useIsAnimated = () => {
	const { cacheStore } = useStores()
	return cacheStore.selectCache((cache) => cache.animationsEnabled)
}

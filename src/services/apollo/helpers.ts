import { rootStore } from '@services/store/root'

async function getRefreshedAccessTokenPromise() {
	const { authorizationStore } = rootStore
	try {
		const data = await authorizationStore.refresh()
		return data?.accessToken
	} catch (e) {
		console.warn(e, '[ON REFRESH TOKEN ERROR]')
		return e
	}
}

let pendingAccessTokenPromise: any = null

export function getAccessTokenPromise() {
	const { authorizationStore } = rootStore

	if (authorizationStore.isLoggedIn && authorizationStore.isValidAccessToken) {
		console.log('[ACCESS VALID]')
		return new Promise((resolve) => resolve(authorizationStore.accessToken))
	}

	console.log('[NEED TO REFRESH]')

	if (!pendingAccessTokenPromise)
		pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(() => (pendingAccessTokenPromise = null))
	return pendingAccessTokenPromise
}

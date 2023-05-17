import jwtDecode, { JwtPayload } from 'jwt-decode'

import { rootStore } from '@services/store/root'

export function isRefreshNeeded(token?: string | null) {
	if (!token) {
		return { valid: false, needRefresh: true }
	}

	const decoded = jwtDecode<JwtPayload>(token)

	if (!decoded) {
		return { valid: false, needRefresh: true }
	}
	if (decoded.exp && Date.now() >= decoded.exp * 1000) {
		return { valid: false, needRefresh: true }
	}
	return { valid: true, needRefresh: false }
}

export const getAccessToken = async () => {
	const { authorizationStore } = rootStore

	switch (true) {
		/* якщо немає токенів - повертаємо null */
		case !authorizationStore.isLoggedIn:
			authorizationStore.logout()
			return null

		/* якщо все гуд - просто повертаємо access token */
		case authorizationStore.isValidAccessToken:
			return authorizationStore.accessToken

		/* повертаємо рефрешнутий access token */
		default:
			return authorizationStore.refresh()
	}
}

async function getRefreshedAccessTokenPromise() {
	const { authorizationStore } = rootStore
	try {
		const data = await authorizationStore.refresh()
		return data?.accessToken
	} catch (e) {
		console.warn(e)
		return e
	}
}

let pendingAccessTokenPromise: any = null

export function getAccessTokenPromise() {
	const { authorizationStore } = rootStore

	if (authorizationStore.isLoggedIn && authorizationStore.isValidAccessToken) {
		return new Promise((resolve) => resolve(authorizationStore.accessToken))
	}

	if (!pendingAccessTokenPromise)
		pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(() => (pendingAccessTokenPromise = null))
	return pendingAccessTokenPromise
}

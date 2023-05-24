import { useEffect } from 'react'

import { navigate, useLocation } from '@reach/router'
import { validate } from 'uuid'

import { useStores } from '@services/store'
import { selectConversationById } from '@services/store/cache'

import { ROUTES } from '@utils/constants'

export function validateId(id: string) {
	return validate(id)
}

export function useConversationId() {
	const location = useLocation()
	const id = location.hash.split('#')[1]

	const isValidId = validateId(id)

	useEffect(() => {
		if (Boolean(id) && !isValidId) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}, [isValidId, id])

	return isValidId ? id : null
}

export const useConversation = () => {
	const { cacheStore } = useStores()

	const id = useConversationId()

	return id ? cacheStore.selectCache(selectConversationById(id)) || null : null
}

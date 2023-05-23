import { useEffect } from 'react'

import { navigate, useLocation } from '@reach/router'
import { validate } from 'uuid'

import { ROUTES } from '@utils/constants'

export function validateId(id: string) {
	return validate(id)
}

export function useConversationId(hash: string) {
	const id = hash.split('#')[1]

	const isValidId = validateId(id)

	useEffect(() => {
		if (!isValidId) {
			navigate(ROUTES.chat(), { replace: true })
		}
	}, [isValidId, id])

	return isValidId ? id : null
}

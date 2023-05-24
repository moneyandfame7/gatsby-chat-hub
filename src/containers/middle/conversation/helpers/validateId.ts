import { validate } from 'uuid'

export function validateId(id: string) {
	return validate(id)
}

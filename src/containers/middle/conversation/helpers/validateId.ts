import { validate } from 'uuid'

/**
 * https://stackoverflow.com/a/38191104/20954848
 */
const UUID_4_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export function validateId(id: string) {
	return validate(id)
}

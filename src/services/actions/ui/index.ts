import { Message } from '@utils/graphql/message'

export const getIsOverlayOpen = () => {
	return Boolean(document.getElementById('Backdrop'))
}

export const isValidHttpUrl = (text: string) => {
	let url

	try {
		url = new URL(text)
	} catch (_) {
		return false
	}

	return url.protocol === 'http:' || url.protocol === 'https:'
}

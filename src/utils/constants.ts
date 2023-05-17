export const ROUTES = {
	chat: (id?: string) => {
		if (id) {
			return `/conversation/#${id}`
		}
		return '/conversation'
	},
	login: () => '/login',
}
export enum KeyboardEventKey {
	Escape = 'Escape',
}

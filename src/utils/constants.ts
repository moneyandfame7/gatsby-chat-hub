export const ROUTES = {
	chat: (id?: string) => {
		if (id) {
			return `/conversation/#${id}`
		}
		return '/conversation/'
	},
	login: () => '/login',
}
export enum KeyboardEventKey {
	Escape = 'Escape',
	Enter = 'Enter',
	Shift = 'Shift',
}

export enum ContainerIndex {
	Left = 1,
	Middle = 2,
	Right = 3,
}

import ls from 'localstorage-slim'

interface LocalStorageConfiguration {
	/* key in localStorage */
	name: string

	/* in ms */
	expiresIn: number

	/*  */
	encrypt: boolean
}

export class LocalStorage<Storage> {
	public constructor(private readonly configuration: LocalStorageConfiguration) {
		this.init()
	}
	public get = () => {
		try {
			return ls.get<Storage>(this.configuration.name, { decrypt: true })
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(e)
			return null
		}
	}

	public set = (field: any) => {
		try {
			const existObj = this.get()
			const newObj = {
				...existObj,
				...field,
			}
			ls.set(this.configuration.name, newObj)
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(e)
		}
	}

	public clear = () => {
		ls.set(this.configuration.name, {})
	}

	private init = () => {
		try {
			const exist = this.get()
			if (!exist) {
				ls.set(this.configuration.name, {})
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(e)
		}
	}
}

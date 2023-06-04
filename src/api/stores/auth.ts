import { makeAutoObservable, toJS } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { AuthScreens } from '@types'

import { hasWindow } from '@utils/functions'

export interface AuthParams {
	phoneNumber?: string
	password?: string
	firstName?: string
	lastName?: string
	pincode?: number
}
export class AuthStore {
	public screen: AuthScreens = AuthScreens.WaitPhoneNumber
	public params: AuthParams = {}
	public error?: string
	public loading: boolean = false

	public constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, { name: 'auth', properties: ['params'], storage: hasWindow() ? localStorage : undefined })
		// autorun(() => {
		// 	switch (true) {
		// 		case Boolean(this.params.phoneNumber):
		// 			if (this.params.phoneNumber && this.params.phoneNumber.length < 3) {
		// 				this.setError('Phone cannot be shorter than 3 symbols')
		// 			} else {
		// 				runInAction(() => {
		// 					this.setState('waitForPincode')
		// 				})
		// 			}
		// 			break
		// 		default:
		// 			console.log('[DEFAULT CASE]:', this.getParams())
		// 	}
		// })
	}

	private setError(err: string) {
		this.error = err
	}

	public setScreen(newScreen: AuthScreens) {
		this.screen = newScreen
	}
	/**
	 * @todo typescript here
	 */
	public updateParams(params: AuthParams) {
		if (Object.keys(params).length) {
			this.params = {
				...this.params,
				...params,
			}
			return
		}
		this.params = {}
	}

	public signIn({ phoneNumber, password }: { phoneNumber: string; password: string }) {
		// void callApi('signIn', { aboba: 5 })
		/* change state */
	}

	public getParams() {
		return toJS(this.params)
	}

	public signOut() {}
}

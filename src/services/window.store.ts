import { makeAutoObservable, observable } from 'mobx'

import { LanguageCode } from '@types'

type Platform = 'macOS' | 'iOS' | 'Windows' | 'Android' | 'Linux'
type Browser =
	| 'Opera'
	| 'Microsoft Edge'
	| 'Google Chrome'
	| 'Safari'
	| 'Mozilla Firefox'
	| 'Microsoft Internet Explorer'
class WindowStore {
	public platform?: Platform
	public browser?: Browser
	public browserVersion?: string

	public language?: LanguageCode

	public isSensorScreen!: boolean

	public constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	private detectPlatform() {
		const { userAgent, platform } = window.navigator
		const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
		const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
		const iosPlatforms = ['iPhone', 'iPad', 'iPod']
		if (
			iosPlatforms.indexOf(platform) !== -1 ||
			// For new IPads with M1 chip and IPadOS platform returns "MacIntel"
			(platform === 'MacIntel' &&
				'maxTouchPoints' in navigator &&
				navigator.maxTouchPoints > 2)
		) {
			this.platform = 'iOS'
		} else if (macosPlatforms.indexOf(platform) !== -1) {
			this.platform = 'macOS'
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			this.platform = 'Windows'
		} else if (/Android/.test(userAgent)) {
			this.platform = 'Android'
		} else if (/Linux/.test(platform)) {
			this.platform = 'Linux'
		}
	}

	private detectBrowser() {
		const userAgent = navigator.userAgent
		let browserName: string
		let fullVersion: string
		// Detect Opera
		if (
			(window as any)?.opr?.addons ||
			(window as any)?.opera ||
			userAgent.indexOf(' OPR/') >= 0
		) {
			this.browser = 'Opera'
			this.browserVersion = userAgent.substring(userAgent.indexOf('OPR/') + 4)
		}
		// Detect Edge
		else if (userAgent.indexOf('Edge') >= 0) {
			this.browser = 'Microsoft Edge'
			this.browserVersion = userAgent.substring(userAgent.indexOf('Edge/') + 5)
		}
		// Detect Chrome
		else if (userAgent.indexOf('Chrome') >= 0) {
			this.browser = 'Google Chrome'
			this.browserVersion = userAgent.substring(
				userAgent.indexOf('Chrome/') + 7
			)
		}
		// Detect Safari
		else if (userAgent.indexOf('Safari') >= 0) {
			this.browser = 'Safari'
			this.browserVersion = userAgent.substring(
				userAgent.indexOf('Version/') + 8
			)
		}
		// Detect Firefox
		else if (userAgent.indexOf('Firefox') >= 0) {
			this.browser = 'Mozilla Firefox'
			this.browserVersion = userAgent.substring(
				userAgent.indexOf('Firefox/') + 8
			)
		}
		// Detect IE
		else if (
			userAgent.indexOf('MSIE') >= 0 ||
			userAgent.indexOf('Trident/') >= 0
		) {
			this.browser = 'Microsoft Internet Explorer'
			this.browserVersion = userAgent.substring(
				userAgent.indexOf('MSIE') + 5,
				userAgent.indexOf(';')
			)
			if (
				typeof this.browserVersion === 'number' &&
				this.browserVersion === -1
			) {
				this.browserVersion = userAgent.substring(userAgent.indexOf('rv:') + 3)
			}
		}
	}

	private detectLanguage() {
		this.language = navigator.language.toLowerCase() as LanguageCode
	}

	private detectSensor() {
		this.isSensorScreen = window.matchMedia('(pointer: coarse)').matches
	}

	public initialize() {
		this.detectBrowser()
		this.detectLanguage()
		this.detectPlatform()
		this.detectSensor()
	}
}

export const windowStore = new WindowStore()

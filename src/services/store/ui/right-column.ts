import { makeAutoObservable } from 'mobx'

import { NullableField } from '@utils/types'

export enum RightColumnContent {
	MessagesSearch,
	Information,
}
export class RightColumnUiStore {
	public content: RightColumnContent
	public isOpen: boolean
	public constructor() {
		this.content = RightColumnContent.Information
		this.isOpen = false

		makeAutoObservable(this, {}, { autoBind: true })
	}

	public close() {
		this.isOpen = false
	}

	public open() {
		this.isOpen = true
	}
	/* if display < 1280px - position absolute */
	public setContent(c: RightColumnContent) {
		if (this.content !== c) {
			this.content = c
		} else {
			console.log('[CONTENT IS EQUAL TO OLD]')
		}
		this.open()
	}
}

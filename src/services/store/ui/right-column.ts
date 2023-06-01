import { makeAutoObservable } from 'mobx'

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

	public get isInDom() {
		return Boolean(document.getElementById('RightColumn'))
	}

	public reset() {
		switch (this.content) {
			case RightColumnContent.MessagesSearch:
				this.setContent(RightColumnContent.Information)
				break
			case RightColumnContent.Information:
				this.close()
				break
		}
	}

	/* if display < 1280px - position absolute */
	public setContent(c: RightColumnContent) {
		this.open()
		if (this.content !== c) {
			this.content = c
		} else {
			console.log('[CONTENT IS EQUAL TO OLD]')
		}
	}
}

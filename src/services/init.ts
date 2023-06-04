import { configure } from 'mobx'

import { windowStore } from './window.store'

const loadInitialLanguage = () => {}

const loadWindowEnvironment = () => {
	windowStore.initialize()
}

export const initialize = () => {
	configure({
		enforceActions: 'always',
		computedRequiresReaction: true,
		reactionRequiresObservable: true,
		observableRequiresReaction: true,
		disableErrorBoundaries: true,
	})
	loadWindowEnvironment()
	console.log(`[LOG] Application has starded!`)
}

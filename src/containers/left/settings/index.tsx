import React from 'react'

import { LeftColumnUiStore } from '@services/store'

export interface WithLeftColumnStore {
	leftColumnUiStore: LeftColumnUiStore
}
interface SettingsProps extends WithLeftColumnStore {}
export const Settings: React.FC<SettingsProps> = ({ leftColumnUiStore }) => {
	return <>Settings</>
}

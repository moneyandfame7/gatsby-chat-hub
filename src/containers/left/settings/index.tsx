import React from 'react'

import { LeftColumnUiStore } from '@services/store'

export interface LeftColumnUI {
	leftColumnUiStore: LeftColumnUiStore
}
interface SettingsProps extends LeftColumnUI {}
export const Settings: React.FC<SettingsProps> = ({ leftColumnUiStore }) => {
	return <>Settings</>
}

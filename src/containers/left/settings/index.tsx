import React from 'react'

import { PropsWithLeftColumnStore } from '@utils/types'

/**
 * @todo зробити recent conversations і users ( після відкривання чату, зберігати в сторі айдішнік?)
 */

interface SettingsProps extends PropsWithLeftColumnStore {}
export const Settings: React.FC<SettingsProps> = ({ leftColumnUiStore }) => {
	return <>Settings</>
}

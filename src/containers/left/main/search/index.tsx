import React from 'react'

import { observer } from 'mobx-react-lite'
import LoremIpsum from 'react-lorem-ipsum'

import { Animation } from '@components/animation'

import type { PropsWithLeftColumnStore } from '@utils/types'

interface LeftSearchProps extends PropsWithLeftColumnStore {}
export const LeftSearch: React.FC<LeftSearchProps> = observer(({ leftColumnUiStore }) => {
	return (
		<Animation.Fade pos='absolute' width='100%' padding='inherit' top={0} left={0} bg='pink' height='100%'>
			<LoremIpsum p={2} />
		</Animation.Fade>
	)
})

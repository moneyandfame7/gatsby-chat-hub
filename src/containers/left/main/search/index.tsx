import React from 'react'

import { Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { Animation } from '@components/animation'

import type { PropsWithLeftColumnStore } from '@utils/types'

interface LeftSearchProps extends PropsWithLeftColumnStore {}
export const LeftSearch: React.FC<LeftSearchProps> = observer(({ leftColumnUiStore }) => {
	return (
		<Animation.Fade pos='absolute' width='100%' padding='inherit' top={0} left={0} bg='pink' height='100%'>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
		</Animation.Fade>
	)
})

import React from 'react'

import { Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { Animation } from '@components/animation'

import type { PropsWithLeftColumnStore } from '@utils/types'

interface LeftSearchProps extends PropsWithLeftColumnStore {}
export const LeftSearch: React.FC<LeftSearchProps> = observer(({ leftColumnUiStore }) => {
	return (
		<Animation.Scale
			custom={{ open: 1, hidden: 1.05 }}
			pos='absolute'
			width='100%'
			padding='inherit'
			top={0}
			left={0}
			height='100%'
			p={5}
		>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
			<Text>lasdlflasldflalsdfllasdlflasdlflasdlflasdlf</Text>
		</Animation.Scale>
	)
})

import React, { TextareaHTMLAttributes, useRef, useState } from 'react'

import { Button, Flex, Textarea } from '@chakra-ui/react'
import ResizeTextarea from 'react-textarea-autosize'

import { useLayout } from '@services/hooks'

import { MESSAGE_CONTAINER_WIDTH } from '@containers/middle/message/list'

import './style.css'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>
interface ConversationInputProps extends TextAreaProps {
	onSend: (text: string) => void
}

export const ConversationInput: React.FC<ConversationInputProps> = ({ onSend, ...props }) => {
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const { isMobile } = useLayout()
	const maxInputHeight = isMobile ? 256 : 350
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget
		setValue(value)
	}
	const isOverflow = (inputRef.current && inputRef.current?.scrollHeight > maxInputHeight) || false
	return (
		<Flex
			data-component-name='ConversationInput'
			w={{ ...(MESSAGE_CONTAINER_WIDTH as object), base: '100%' }}
			mx='auto'
			px={1}
		>
			<Textarea
				bg='white'
				h='60px'
				minH='60px'
				padding='20px 30px'
				resize='none'
				ref={inputRef}
				value={value}
				onChange={handleInputChange}
				placeholder='Send message'
				overflowY={isOverflow ? 'auto' : 'hidden'}
				maxH={maxInputHeight}
				as={ResizeTextarea}
				transition='all 0.3s ease'
			/>
			<Button
				onClick={(e) => {
					if (value.length > 0) {
						e.preventDefault()
						onSend(value)
						setValue('')
					}
				}}
			>
				Send
			</Button>
		</Flex>
	)
}

import React, { FC, MouseEvent, MouseEventHandler, useCallback } from 'react'

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

import { windowStore } from '@services/window.store'

interface ButtonProps extends ChakraButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>
	isLoading?: boolean
	isText?: boolean
	isUppercase?: boolean
	fullWidth?: boolean
	type?: 'submit' | 'button'
}

export const Button: FC<ButtonProps> = ({
	onClick,
	isLoading,
	isText,
	isUppercase = true,
	disabled = false,
	fullWidth = true,
	type = 'button',
	...props
}) => {
	const handleMouseDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		handleClick(e)
	}, [])
	const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		onClick(e)
		console.log('Clicked')
	}, [])

	// const secondaryHandleClick = (e: MouseEvent<HTMLButtonElement>) => {
	// 	onClick(e)
	// 	console.log('Clicked 555')
	// }
	return (
		<ChakraButton
			onClick={windowStore.isSensorScreen ? handleClick : undefined}
			onMouseDown={handleMouseDown}
			w={fullWidth ? 'full' : 'initial'}
			bg={isLoading ? (isText ? 'primary.transparent' : 'primary.default') : 'initial'}
			_hover={{
				bg: isLoading ? (isText ? 'primary.transparent' : 'primary.dark') : 'initial',
			}}
			height='60px'
			p={2}
			fontWeight={400}
			textTransform={isUppercase ? 'uppercase' : 'initial'}
			borderRadius={14}
			color={isText ? 'primary.default' : 'white'}
			isLoading={isLoading}
			{...props}
		/>
	)
}

import React, { ChangeEvent, FC, FormEvent, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { InputText } from './shared/input'

type PasswordEventHandler = (password: string) => void

interface PasswordFormProps {
	isLoading: boolean
	hint?: string
	description?: string
	placeholder?: string
	onSubmit: PasswordEventHandler
	onInputChange?: PasswordEventHandler
}
export const PasswordForm: FC<PasswordFormProps> = ({
	isLoading,
	hint,
	description,
	placeholder,
	onSubmit,
	onInputChange,
}) => {
	const [password, setPassword] = useState('')
	const [canSubmit, setCanSubmit] = useState(false)
	const [isPasswordVisible, setisPasswordVisible] = useState(false)
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setPassword(value)
		setCanSubmit(value.length > 1)
	}

	const handleShowPassword = () => {
		setisPasswordVisible((prev) => !prev)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isLoading) {
			return
		}
		if (canSubmit) {
			onSubmit(password)
		}
	}
	return (
		<form>
			<Box>
				<InputText onChange={handleInputChange} value={password} />
				{/* <IconButton
					h='100%'
					w='50px'
					zIndex={3}
					borderRadius={0}
					onClick={() => {}}
					icon={
						<EyeOffIcon
							_hover={{
								color: '#5f5c5c',
							}}
						/>
					}
					aria-label='show password'
					pos='absolute'
					top='50%'
					transform='translateY(-50%)'
					right='0'
					_hover={{
						background: 'none',
					}}
				/> */}
			</Box>
		</form>
	)
}

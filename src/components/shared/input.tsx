import React, { ChangeEventHandler, FC, RefObject } from 'react'

import './input.scss'

interface InputProps {
	ref?: RefObject<HTMLInputElement>
	id?: string
	value: string
	error?: string
	disabled?: boolean
	placeholder?: string
	label?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	onBlur?: ChangeEventHandler<HTMLInputElement>
	onFocus?: ChangeEventHandler<HTMLInputElement>
}
export const InputText: FC<InputProps> = ({
	ref,
	id,
	value,
	error,
	label,
	disabled,
	placeholder,
	onChange,
	onBlur,
	onFocus,
}) => {
	const labelText = error || label
	return (
		<div className='input-container'>
			<input
				id={id}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				value={value}
				type='text'
				autoComplete='off'
				disabled={disabled}
				aria-label={labelText}
				placeholder={placeholder}
			/>
			{label && (
				<label htmlFor={id}>
					<div className='text'>{label}</div>
				</label>
			)}
		</div>
	)
}

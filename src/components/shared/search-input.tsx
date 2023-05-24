import React, { useEffect, useRef, useState } from 'react'

import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { useIsAnimated } from '@services/hooks'

import { IconButton } from '@components/shared/buttons'
import { SecondaryLoader } from '@components/shared/loaders'

import { Animation } from '../animation'
import { CloseIcon, SearchIcon } from '../icons'

/* ui */

interface SearchInputProps {
	handleChange: (value: string) => void
	handleFocus: () => void
	placeholder: string
	isFocused: boolean
	isLoading: boolean
	width?: string
}

export const SearchInput: React.FC<SearchInputProps> = observer(
	({ isLoading, handleFocus, handleChange, placeholder, isFocused, width }) => {
		const TEXT_ANIMAION_POSITION = '30%'
		const inputRef = useRef<HTMLInputElement>(null)
		const [inputValue, setInputValue] = useState('')
		const [textStyles, setTextStyles] = useState({
			x: TEXT_ANIMAION_POSITION,
		})

		const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { currentTarget } = e
			setInputValue(currentTarget.value)
		}
		useEffect(() => {
			handleChange(inputValue)
		}, [inputValue])

		const handleClearInputValue = () => {
			if (!inputRef.current) {
				return
			}
			setInputValue('')
			inputRef.current.focus()
		}

		useEffect(() => {
			if (!inputRef.current) {
				return
			}

			if (isFocused) {
				inputRef?.current?.focus()
			} else {
				inputRef.current.blur()
				setInputValue('')
			}
		}, [isFocused, placeholder])

		const isAnimated = useIsAnimated()
		return (
			<InputGroup cursor='default' width={width}>
				<InputLeftElement pointerEvents='none' children={<SearchIcon />} />
				<Input
					lineHeight='normal'
					ref={inputRef}
					autoFocus={false}
					value={inputValue}
					_focusVisible={{ borderColor: 'primary' }}
					borderRadius={12}
					cursor='default'
					variant='filled'
					pr='40px'
					onChange={onChangeValue}
					placeholder={placeholder}
					_placeholder={{
						transition: 'ease .3s',
						color: 'gray.400',
						fontSize: 14,
						transform: `translateX(${textStyles.x})`,
					}}
					onBlur={() => {
						if (isAnimated) {
							setTextStyles({ x: TEXT_ANIMAION_POSITION })
						}
					}}
					onFocus={() => {
						if (isAnimated) {
							setTextStyles({ x: '0%' })
						}

						handleFocus()
					}}
				/>

				<AnimatePresence initial={false}>
					{Boolean(inputValue) && !isLoading && (
						<Animation.Scale key='AnimatedClearButton'>
							<InputRightElement>
								<IconButton
									height='17px'
									minWidth='17px'
									padding={0}
									bg='blackAlpha.500'
									_hover={{
										bg: 'blackAlpha.500',
									}}
									icon={<CloseIcon color='#fff' fontSize='10px' strokeWidth='3px' />}
									onClick={handleClearInputValue}
									aria-label='Clear search query'
								/>
							</InputRightElement>
						</Animation.Scale>
					)}
					{isLoading && (
						<Animation.Fade key='AnimatedLoader'>
							<InputRightElement>
								<SecondaryLoader color='primary' />
							</InputRightElement>
						</Animation.Fade>
					)}
				</AnimatePresence>
			</InputGroup>
		)
	}
)

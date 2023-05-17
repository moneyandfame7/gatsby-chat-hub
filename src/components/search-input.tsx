/* lib */
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, InputRightElement, Text } from '@chakra-ui/react'

/* ui */
import { IconButton, Loader } from './ui'
import { observer } from 'mobx-react-lite'
import { SCALE_ANIMATION } from './left/main'
import { Animated } from './animated'
import { CloseIcon } from './ui/icons'

interface SearchInputProps {
  handleChange: (value: string) => void
  handleFocus: () => void
  placeholder: string
  isFocused: boolean
  isLoading: boolean
}

export const SearchInput: React.FC<SearchInputProps> = observer(
  ({ isLoading, handleFocus, handleChange, placeholder, isFocused }) => {
    const TEXT_ANIMAION_POSITION = '30%'
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState('')
    const [textStyles, setTextStyles] = useState({
      x: TEXT_ANIMAION_POSITION
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

    return (
      <InputGroup cursor="default">
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.600" fontSize={12} />} />
        <Input
          lineHeight="normal"
          ref={inputRef}
          autoFocus={false}
          value={inputValue}
          _focusVisible={{ borderColor: 'primary' }}
          borderRadius={12}
          cursor="default"
          variant="filled"
          pr="40px"
          onChange={onChangeValue}
          placeholder={placeholder}
          _placeholder={{
            transition: 'ease .3s',
            color: 'gray.400',
            fontSize: 14,
            transform: `translateX(${textStyles.x})`
          }}
          onBlur={() => {
            setTextStyles({ x: TEXT_ANIMAION_POSITION })
          }}
          onFocus={() => {
            setTextStyles({ x: '0%' })

            handleFocus()
          }}
        />

        <AnimatePresence initial={false}>
          {Boolean(inputValue) && !isLoading && (
            <Animated
              variants={SCALE_ANIMATION}
              initial="hidden"
              animate="open"
              exit="hidden"
              key="AnimatedClearButton"
            >
              <InputRightElement>
                <IconButton
                  height="16px"
                  minWidth="16px"
                  padding={0}
                  bg="blackAlpha.500"
                  _hover={{
                    bg: 'blackAlpha.500'
                  }}
                  size="sm"
                  zIndex={2}
                  icon={<CloseIcon color="#fff" fontSize="10px" strokeWidth="3px" />}
                  onClick={handleClearInputValue}
                  aria-label="Clear search query"
                />
              </InputRightElement>
            </Animated>
          )}
          {isLoading && (
            <Animated variants={SCALE_ANIMATION} initial="hidden" animate="open" exit="hidden" key="AnimatedLoader">
              <InputRightElement>
                <Loader size="small" />
              </InputRightElement>
            </Animated>
          )}
        </AnimatePresence>
      </InputGroup>
    )
  }
)

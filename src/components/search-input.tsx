import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, InputProps } from '@chakra-ui/react'

interface SearchInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  placeholder: string
  isFocused: boolean
}
type InputStyles = {
  left: number | string
}
export const SearchInput: React.FC<SearchInputProps> = ({ handleFocus, handleChange, placeholder, isFocused }) => {
  const EL_POSITION = '30%'
  const TEXT_POSITION = '30%'

  const [iconStyle, setIconStyle] = useState<InputStyles>({
    left: EL_POSITION
  })
  const [inputStyle, setInputStyle] = useState<InputStyles>({
    left: TEXT_POSITION
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFocused) {
      inputRef?.current?.focus()
    }
  }, [isFocused])

  return (
    <InputGroup cursor="default">
      <InputLeftElement
        transition="ease .3s"
        style={{
          ...iconStyle
        }}
        pointerEvents="none"
        children={<SearchIcon color="gray.600" fontSize={12} />}
      />
      <Input
        ref={inputRef}
        autoFocus={isFocused}
        _focusVisible={{ borderColor: 'primary' }}
        borderRadius={12}
        cursor="default"
        onKeyDown={e => {
          if (e.code === 'Escape') {
            e.currentTarget.blur()
            e.currentTarget.value = ''
          }
        }}
        variant="filled"
        onChange={handleChange}
        placeholder={placeholder}
        _placeholder={{
          transition: 'ease .3s',
          color: 'gray.400',
          ml: 10,
          position: 'absolute',
          top: '50%',
          fontSize: 14,
          transform: 'translateY(-50%)',
          ...inputStyle
        }}
        onBlur={() => {
          setInputStyle({
            left: TEXT_POSITION
          })
          // if (conversation.length === 0) {
          //   setIconStyle({
          //     left: EL_POSITION
          //   })
          // }
        }}
        onFocus={() => {
          setInputStyle({
            left: 10
          })
          setIconStyle({
            left: 0
          })
          handleFocus()
        }}
      />
    </InputGroup>
  )
}

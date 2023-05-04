import React, { FC } from 'react'

import { Button, Input, Text, Tooltip } from '@chakra-ui/react'

interface CreateUsernameProps {
  inputError: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  submit: () => void
}

export const CreateUsername: FC<CreateUsernameProps> = ({ inputError, handleChange, submit }) => {
  return (
    <>
      <Text fontSize="3xl" fontWeight={600}>
        Create Username
      </Text>
      <Input placeholder="Enter username" onChange={handleChange} />
      <Tooltip hasArrow label={inputError}>
        <Button width="100%" isDisabled={!!inputError} onClick={submit}>
          Save
        </Button>
      </Tooltip>
    </>
  )
}

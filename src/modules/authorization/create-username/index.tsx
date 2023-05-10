/* lib */
import React, { FC } from 'react'
import { Button, Input, Text, Tooltip } from '@chakra-ui/react'

/* services  */
import { useCreateUsername } from './hook'

export const CreateUsername: FC = () => {
  const { handleChange, loading, inputError, onCreateUsername } = useCreateUsername()

  return (
    <React.Fragment>
      <Text fontSize="3xl" fontWeight={600}>
        Create a username
      </Text>
      <Input variant="filled" placeholder="Enter a username" onChange={handleChange} />
      <Tooltip hasArrow label={inputError}>
        <Button
          colorScheme="purple"
          width="100%"
          isDisabled={!!inputError}
          onClick={onCreateUsername}
          isLoading={loading}
        >
          Save
        </Button>
      </Tooltip>
    </React.Fragment>
  )
}

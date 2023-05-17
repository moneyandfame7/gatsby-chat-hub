import React, { type FC } from 'react'

import { Button, Input, Text, Tooltip } from '@chakra-ui/react'

import { useCreateUsername } from './hook'

export const CreateUsername: FC = () => {
	const { handleChange, loading, inputError, onCreateUsername } = useCreateUsername()

	return (
		<React.Fragment>
			<Text fontSize='3xl' fontWeight={600}>
				Create a username
			</Text>
			<Input variant='filled' placeholder='Enter a username' onChange={handleChange} />
			<Tooltip hasArrow label={inputError}>
				<Button
					colorScheme='gray'
					width='100%'
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

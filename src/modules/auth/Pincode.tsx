import React, { FC } from 'react'

import { Box, HStack, PinInput, PinInputField } from '@chakra-ui/react'

import { WithAuthProps } from '@types'

interface AuthPincodeProps extends WithAuthProps {}
export const AuthPincode: FC<AuthPincodeProps> = ({ handleUpdateParams, isLoading }) => {
	return (
		<Box border='1px solid blue' height='100%'>
			<HStack>
				<PinInput>
					<PinInputField />
					<PinInputField />
					<PinInputField />
					<PinInputField />
				</PinInput>
			</HStack>
		</Box>
	)
}

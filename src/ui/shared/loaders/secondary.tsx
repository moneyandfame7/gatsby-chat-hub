/* lib  */
import React from 'react'

import { CircularProgress, CircularProgressProps } from '@chakra-ui/react'

export const SecondaryLoader: React.FC<CircularProgressProps> = ({ ...props }) => {
	return <CircularProgress isIndeterminate color='purple' trackColor='none' size='20px' {...props} />
}
/* lib  */
import React from 'react'

import { CircularProgress, CircularProgressProps, Spinner, SpinnerProps } from '@chakra-ui/react'

export const SecondaryLoader: React.FC<SpinnerProps> = ({ ...props }) => {
	return <Spinner speed='0.8s' thickness='1.5px' color='#FDD764' size='md' {...props} />
}

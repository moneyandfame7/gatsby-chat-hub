/* lib  */
import React from 'react'

import { Spinner, SpinnerProps } from '@chakra-ui/react'

export const SecondaryLoader: React.FC<SpinnerProps> = ({ ...props }) => {
	return <Spinner speed='0.8s' thickness='1.5px' color='yellow' size='md' {...props} />
}

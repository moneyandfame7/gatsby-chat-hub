import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

import './styles.css'

interface LoaderProps extends BoxProps {
	size?: 'large' | 'small'
}
export const Loader: React.FC<LoaderProps> = ({ size = 'small', ...props }) => {
	return (
		<Box className={`spinner spinner-${size}`} {...props}>
			<div className='bar1'></div>
			<div className='bar2'></div>
			<div className='bar3'></div>
			<div className='bar4'></div>
			<div className='bar5'></div>
			<div className='bar6'></div>
			<div className='bar7'></div>
			<div className='bar8'></div>
			<div className='bar9'></div>
			<div className='bar10'></div>
			<div className='bar11'></div>
			<div className='bar12'></div>
		</Box>
	)
}

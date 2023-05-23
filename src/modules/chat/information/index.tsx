import React, { FC } from 'react'

import { Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useIsMobileScreen } from '@services/hooks'

export const ConversationInformation: FC = () => {
	const isMobileScreen = useIsMobileScreen()
	/* Header */
	/* index.tsx */
	return (
		<VStack
			zIndex={10000}
			as={motion.div}
			pos={{ base: 'absolute', md: 'initial' }}
			right={0}
			initial={{ width: 0 }}
			animate={{ width: isMobileScreen ? '100%' : 300 }}
			exit={{ width: 0 }}
			margin='0px !important'
			w={{ base: '100%', md: '300px' }}
			bg='blue.100'
			h='100vh'
		>
			<Text fontSize='xl' as={motion.p} animate={{ width: 'max-content' }} exit={{ width: 0 }} whiteSpace='nowrap'>
				User info
			</Text>
		</VStack>
	)
}

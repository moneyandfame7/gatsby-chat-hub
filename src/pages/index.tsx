/* lib */
import React, { type FC } from 'react'

import { Link, PageProps } from 'gatsby'

import { Center } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { pageHead } from '@components/page-head'

/* services */
import { ROUTES } from '@utils/constants'

const Root: FC<PageProps> = ({ location }) => {
	return (
		<Center alignItems='start' minH='100vh' gap={5}>
			{/* <Center
				alignItems='start'
				as={motion.div}
				transition={{ duration: 5 }}
				minH='300px'
				minW='300px'
				borderRadius='20px'
				ref={constraintsRef}
				bg='blackAlpha.400'
			>
				<Text
					drag
					dragConstraints={constraintsRef}
					userSelect='none'
					as={motion.p}
					fontSize='3xl'
					whileHover={{ scale: 1.25 }}
					whileTap={{ scale: 1.5 }}
					color='#fff'
					onClick={() => {}}
				>
					<motion.button
						onClick={() => {
							navigate(ROUTES.chat())
						}}
					>
						Go chat
					</motion.button>
				</Text>
			</Center> */}
			Aboba
			<Link to={ROUTES.chat()}>Go chat</Link>
		</Center>
	)
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })

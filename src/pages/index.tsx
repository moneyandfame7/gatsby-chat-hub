/* lib */
import React, { type FC, useState } from 'react'

import { Link, PageProps } from 'gatsby'

import { Button, Center } from '@chakra-ui/react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { pageHead } from '@components/page-head'

/* services */
import { ROUTES } from '@utils/constants'

const TEST: Variants = {
	hidden: {
		x: '-50%',
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
	open: {
		x: 0,
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
}
const Root: FC<PageProps> = ({ location }) => {
	const [open, setOpen] = useState(false)
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
			<motion.div
				variants={TEST}
				animate={open ? 'hidden' : 'open'}
				style={{ background: 'red', width: '50%', position: 'fixed' }}
			>
				<Link to={ROUTES.chat()}>Go chat</Link>
				Aboba
				<Button
					colorScheme='facebook'
					onClick={() => {
						setOpen((prev) => !prev)
					}}
				>
					Click
				</Button>
			</motion.div>
			<AnimatePresence>
				{open && (
					<div>
						<motion.div
							key='second'
							style={{
								position: 'fixed',
								left: 0,
								top: 0,
								height: '100vh',
								width: '100vw',
								background: 'black',
								opacity: 0.3,
							}}
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 0.3,
							}}
							exit={{
								opacity: 0,
								transition: { delay: 0.2 },
							}}
						/>

						<motion.div
							key='firstssds'
							style={{
								position: 'fixed',
								left: 0,
								top: 0,
								height: '100vh',
								background: 'white',
								margin: 0,
								width: '100%',
							}}
							initial={{ x: '100%' }}
							animate={{
								x: 0,
								transition: { type: 'spring', bounce: 0, duration: 0.5 },
							}}
							exit={{
								x: '100%',
								transition: { type: 'spring', bounce: 0, duration: 0.5 },
							}}
						>
							<Button
								colorScheme='facebook'
								onClick={() => {
									setOpen((prev) => !prev)
								}}
							>
								Click
							</Button>
							LOrem ipsum dorem
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</Center>
	)
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })

import React, {
	FC,
	PropsWithChildren,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react'

import { Box } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

interface TransitionProps extends PropsWithChildren {
	activeKey?: string
	shouldUnmount?: boolean
}

const getKey = (el: React.ReactNode) => {
	if (!React.isValidElement(el)) {
		throw new Error('In Transition component not valid React element')
	}
	if (!el.key) {
		throw new Error(
			`Component inside Transition must have unique Key attribute`
		)
	}
	return el.key
}

export const Transition: FC<TransitionProps> = memo(
	({ children, activeKey, shouldUnmount = false }) => {
		const [elements, setElements] = useState<React.ReactNode[]>([])

		const existIn = useCallback(
			(element: React.ReactNode) => {
				return Boolean(elements.find((el) => getKey(el) === getKey(element)))
			},
			[elements]
		)
		const shouldUpdate = !existIn(children)
		useEffect(() => {
			if (children) {
				if (shouldUnmount) {
					setElements([children])
				} else if (shouldUpdate) {
					console.log({ ALREADY_EXIST: false, activeKey })
					setElements((prev) => [...prev, children])
				} else {
					console.log({ ALREADY_EXIST: true })
				}
			}
		}, [children])

		const renderWithTransition = useCallback(() => {
			if (shouldUnmount) {
				return (
					<Box minH='100vh' w='full' h='full' data-transition='fade'>
						{children}
					</Box>
				)
			} else {
				return elements.map((el) => {
					const key = getKey(el)
					const isActive = key === activeKey
					return (
						<Box
							minH='100vh'
							w='full'
							h='full'
							key={getKey(el)}
							display={isActive ? 'block' : 'none'}
							data-transition={isActive ? 'visible' : 'hidden'}
						>
							{el}
						</Box>
					)
				})
			}
		}, [elements, shouldUnmount, children, activeKey])

		return (
			<AnimatePresence initial={false}>
				<Box data-component-name='Transition'>{renderWithTransition()}</Box>
			</AnimatePresence>
		)
	}
)

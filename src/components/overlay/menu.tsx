/* lib  */
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

import {
	Menu,
	MenuItem,
	MenuItemProps,
	MenuList,
	MenuListProps,
	MenuProps,
	PlacementWithLogical,
	Portal,
	SystemStyleObject,
	forwardRef,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useIsAnimated } from '@services/hooks'

import { KeyboardEventKey } from '@utils/constants'
import { NullableField } from '@utils/types'

import { Backdrop } from './backdrop'

interface StyledMenuContextParams {
	handleClose: VoidFunction
	handleOpen: VoidFunction
	isOpen: boolean
}
const StyledMenuContext = createContext<NullableField<StyledMenuContextParams>>(null)
const StyledMenuProvider = StyledMenuContext.Provider

export const useStyledMenuContext = () => {
	const data = useContext(StyledMenuContext)

	if (!data) {
		// throw new Error('Can not use `useStyledMenuContext` outside of the `StyledMenuProvider`')
	}
	return data
}

export const StyledMenuList = observer(
	forwardRef<MenuListProps, 'div'>(({ ...props }, ref) => {
		const withAnimations = useIsAnimated()
		const baseStyle: SystemStyleObject = {
			py: 2,
			px: 1,
			bg: withAnimations ? 'rgb(255 255 255/73%)' : '#fff',
			backdropFilter: withAnimations ? 'auto' : undefined,
			backdropBlur: withAnimations ? '4px' : undefined,
			borderRadius: 10,
		}
		return <MenuList sx={baseStyle} {...props} ref={ref} />
	})
)

export const StyledMenuItem = observer(
	forwardRef<MenuItemProps, 'div'>(({ ...props }, ref) => {
		const withAnimations = useIsAnimated()
		const context = useStyledMenuContext()
		const baseStyle: SystemStyleObject = {
			bg: 'none',
			backgroundColor: 'none',
			_hover: { bg: 'blackAlpha.200' },
			borderRadius: 8,
			transition: withAnimations ? 'all 0.2s ease' : 'none',
			color: props.color || 'text.primary',
			py: 1.5,
			_active: withAnimations ? { transform: 'scale(0.97)' } : undefined,
			fontWeight: 500,
			fontSize: '.875rem',
		}

		return (
			<MenuItem
				sx={baseStyle}
				ref={ref}
				{...props}
				onClick={(e) => {
					if (props.closeOnSelect && context?.handleClose) {
						context?.handleClose()
						props.onClick && props.onClick(e)
					} else {
						props.onClick && props.onClick(e)
					}
				}}
			/>
		)
	})
)

interface StyledMenuProps extends PropsWithChildren {
	menuButton?: React.ReactElement
	placement?: PlacementWithLogical
}

export const StyledMenu: React.FC<StyledMenuProps & MenuProps> = ({
	placement,
	menuButton = null,
	children,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}

	const handlePressEscape = (e: KeyboardEvent) => {
		if (e.code === KeyboardEventKey.Escape) {
			e.preventDefault()
			e.stopPropagation()
			handleClose()
		}
	}

	return (
		<StyledMenuProvider value={{ handleClose, handleOpen, isOpen }}>
			<Menu isLazy placement={placement} isOpen={isOpen} onOpen={handleOpen} {...props}>
				{menuButton}

				<Portal>
					<StyledMenuList zIndex='popover'>{children}</StyledMenuList>
				</Portal>
				{isOpen && <Backdrop /* bg='red'  */ zIndex='overlay' onClick={handleClose} handler={handlePressEscape} />}
			</Menu>
		</StyledMenuProvider>
	)
}

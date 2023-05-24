/* lib  */
import React, { PropsWithChildren, useState } from 'react'

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

import { Backdrop } from './backdrop'

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

		return <MenuItem sx={baseStyle} {...props} ref={ref} />
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
		<Menu isLazy placement={placement} isOpen={isOpen} onOpen={handleOpen} {...props}>
			{menuButton}

			<Portal>
				<StyledMenuList zIndex='sticky'>{children}</StyledMenuList>
			</Portal>
			{isOpen && <Backdrop onClick={handleClose} handler={handlePressEscape} />}
		</Menu>
	)
}

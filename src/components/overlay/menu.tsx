/* lib  */
import React, { PropsWithChildren, useState } from 'react'

import { Menu, MenuItem, MenuList, PlacementWithLogical, Portal, chakra } from '@chakra-ui/react'

import { KeyboardEventKey } from '@utils/constants'

import { Backdrop } from './backdrop'

export const StyledMenuList = chakra(MenuList, {
	baseStyle: {
		py: 2,
		px: 1,
		bg: 'rgb(255 255 255 / 73%)',
		backdropFilter: 'auto',
		backdropBlur: '4px',
		borderRadius: 10,
	},
})

export const StyledMenuItem = chakra(MenuItem, {
	baseStyle: {
		bg: 'none',
		backgroundColor: 'none',
		_hover: { bg: 'blackAlpha.200' },
		borderRadius: 8,
		transition: 'all 0.2s ease',
		color: 'text.primary',
		py: 1.5,
		_active: { transform: 'scale(0.98)' },
		fontWeight: 500,
		fontSize: '.875rem',
	},
})

interface StyledMenuProps extends PropsWithChildren {
	menuButton?: React.ReactElement
	placement?: PlacementWithLogical
}

export const StyledMenu: React.FC<StyledMenuProps> = ({ placement, menuButton = null, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}
	return (
		<Menu placement={placement} isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
			{menuButton}

			<Portal>
				<StyledMenuList
					onKeyDown={(e) => {
						if (e.code === KeyboardEventKey.Escape) {
							e.stopPropagation()
							handleClose()
						}
					}}
				>
					{children}
				</StyledMenuList>
			</Portal>
			{isOpen && <Backdrop onClick={handleClose} />}
		</Menu>
	)
}

import React, { useMemo } from 'react'

import { MenuButton } from '@chakra-ui/react'
import { Variants } from 'framer-motion'

import { Animated } from '@ui/animation'
import { ContactsIcon, LogoutIcon, MenuIcon, NewChatIcon } from '@ui/icons'
import { StyledMenu, StyledMenuItem } from '@ui/overlay'
import { IconButton } from '@ui/shared/buttons'

interface LeftDropdownMenuProps {
	onNewChatSelect: () => void
	onLogOutSelect: () => void
}
export const ICON_ROTATE_ANIMATION: Variants = {
	hidden: {
		rotate: 180,
		transition: { duration: 0.2 },
	},
	open: {
		rotate: 360,
		transition: { duration: 0.2 },
	},
}
export const LeftDropdownMenu: React.FC<LeftDropdownMenuProps> = ({ onNewChatSelect, onLogOutSelect }) => {
	const menuItems = useMemo(
		() => (
			<>
				<StyledMenuItem icon={<NewChatIcon />} onClick={onNewChatSelect}>
					New chat
				</StyledMenuItem>
				<StyledMenuItem icon={<ContactsIcon />} onClick={onNewChatSelect}>
					Contacts
				</StyledMenuItem>
				<StyledMenuItem icon={<LogoutIcon />} onClick={onLogOutSelect}>
					Log out
				</StyledMenuItem>
			</>
		),
		[]
	)
	return (
		<Animated variants={ICON_ROTATE_ANIMATION} initial='hidden' animate='open' exit='hidden'>
			<StyledMenu menuButton={<MenuButton as={IconButton} icon={<MenuIcon />} p={0} aria-label='Open menu' />}>
				{menuItems}
			</StyledMenu>
		</Animated>
	)
}

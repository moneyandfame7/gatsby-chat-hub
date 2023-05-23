import React, { useMemo } from 'react'

import { MenuButton } from '@chakra-ui/react'

import { Animation } from '@components/animation'
import { ContactsIcon, LogoutIcon, MenuIcon, NewChatIcon } from '@components/icons'
import { StyledMenu, StyledMenuItem } from '@components/overlay'
import { IconButton } from '@components/shared/buttons'

interface LeftDropdownMenuProps {
	onNewChatSelect: () => void
	onLogOutSelect: () => void
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
		<Animation.Rotate>
			<StyledMenu menuButton={<MenuButton as={IconButton} icon={<MenuIcon />} p={0} aria-label='Open menu' />}>
				{menuItems}
			</StyledMenu>
		</Animation.Rotate>
	)
}

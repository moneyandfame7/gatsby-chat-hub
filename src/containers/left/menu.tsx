import React, { useMemo } from 'react'

import { Flex, MenuButton, MenuDivider, Switch } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'

import { Animation } from '@components/animation'
import {
	AnimationIcon1, // AnimationIcon2,
	ContactsIcon,
	LayoutIcon,
	LogoutIcon,
	MenuIcon,
	NewChatIcon,
} from '@components/icons'
import { StyledMenu, StyledMenuItem } from '@components/overlay'
import { IconButton } from '@components/shared/buttons'

interface LeftDropdownMenuProps {
	onNewChatSelect: () => void
	onLogOutSelect: () => void
}

export const LeftDropdownMenu: React.FC<LeftDropdownMenuProps> = observer(({ onNewChatSelect, onLogOutSelect }) => {
	const { cacheStore } = useStores()
	const { animationsEnabled, rtl } = cacheStore.selectCache((cache) => cache)

	const onSwitchAnimations = () => {
		cacheStore.toggleAnimations()
	}

	const onSwitchDirection = () => {
		cacheStore.toggleDirection()
	}

	const menuItems = useMemo(
		() => (
			<>
				<StyledMenuItem icon={<NewChatIcon />} onClick={onNewChatSelect}>
					New chat
				</StyledMenuItem>
				<StyledMenuItem icon={<AnimationIcon1 />} onClick={onSwitchAnimations}>
					<Flex align='center' justify='space-between'>
						Animations
						<Switch size='sm' isChecked={animationsEnabled} colorScheme='purple' />
					</Flex>
				</StyledMenuItem>
				<StyledMenuItem icon={<LayoutIcon />} onClick={onSwitchDirection}>
					<Flex align='center' justify='space-between'>
						Right-to-left
						<Switch size='sm' isChecked={rtl} colorScheme='purple' />
					</Flex>
				</StyledMenuItem>
				<StyledMenuItem icon={<ContactsIcon />} onClick={onNewChatSelect}>
					Contacts
				</StyledMenuItem>
				<MenuDivider my='3px' borderColor='gray.300' />
				<StyledMenuItem icon={<LogoutIcon />} onClick={onLogOutSelect}>
					Log out
				</StyledMenuItem>
			</>
		),
		[animationsEnabled, rtl]
	)
	return (
		<Animation.Rotate>
			<StyledMenu
				closeOnSelect={true}
				menuButton={<MenuButton as={IconButton} icon={<MenuIcon />} p={0} aria-label='Open menu' />}
			>
				{menuItems}
			</StyledMenu>
		</Animation.Rotate>
	)
})

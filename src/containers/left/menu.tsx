import React, { useMemo } from 'react'

import { Flex, MenuButton, Switch } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'

import { Animation } from '@components/animation'
import { AnimationIcon1, AnimationIcon2, ContactsIcon, LogoutIcon, MenuIcon, NewChatIcon } from '@components/icons'
import { StyledMenu, StyledMenuItem } from '@components/overlay'
import { IconButton } from '@components/shared/buttons'

interface LeftDropdownMenuProps {
	onNewChatSelect: () => void
	onLogOutSelect: () => void
}

export const LeftDropdownMenu: React.FC<LeftDropdownMenuProps> = observer(({ onNewChatSelect, onLogOutSelect }) => {
	const { cacheStore } = useStores()
	const isAnimationsEnabled = cacheStore.selectCache((cache) => cache.animationsEnabled)

	const onSwitchAnimations = () => {
		cacheStore.toggleAnimations()
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
						<Switch size='sm' isChecked={isAnimationsEnabled} colorScheme='purple' />
					</Flex>
				</StyledMenuItem>
				<StyledMenuItem icon={<ContactsIcon />} onClick={onNewChatSelect}>
					Contacts
				</StyledMenuItem>
				<StyledMenuItem icon={<LogoutIcon />} onClick={onLogOutSelect}>
					Log out
				</StyledMenuItem>
			</>
		),
		[isAnimationsEnabled]
	)
	return (
		<Animation.Rotate>
			<StyledMenu
				closeOnSelect={false}
				menuButton={<MenuButton as={IconButton} icon={<MenuIcon />} p={0} aria-label='Open menu' />}
			>
				{menuItems}
			</StyledMenu>
		</Animation.Rotate>
	)
})

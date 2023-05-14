/* lib */
import React, { useMemo, useRef } from 'react'
import { MenuButton, IconButton, Box, Menu, Portal } from '@chakra-ui/react'

/* ui  */
import { NewChatIcon, LogoutIcon, ContactsIcon, MenuIcon } from '@components/ui'
import { Animated, StyledMenu, StyledMenuItem, StyledMenuList } from '..'
import { Variants } from 'framer-motion'

interface LeftDropdownMenuProps {
  onNewChatSelect: () => void
  onLogOutSelect: () => void
}
export const ICON_ROTATE_ANIMATION: Variants = {
  hidden: {
    rotate: 180,
    transition: { duration: 0.2 }
  },
  open: {
    rotate: 360,
    transition: { duration: 0.2 }
  }
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
    <Animated variants={ICON_ROTATE_ANIMATION} initial="hidden" animate="open" exit="hidden">
      <StyledMenu
        menuButton={
          <MenuButton
            as={IconButton}
            icon={<MenuIcon />}
            size="md"
            color="gray.400"
            p={0}
            aria-label="Open menu"
            _hover={{
              bg: 'blackAlpha.50'
            }}
            bg="transparent"
            borderRadius="50%"
          />
        }
      >
        {menuItems}
      </StyledMenu>
    </Animated>
  )
}

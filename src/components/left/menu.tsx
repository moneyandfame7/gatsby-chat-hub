/* lib */
import React, { useMemo, useRef } from 'react'
import { MenuButton, IconButton, Box, Menu, Portal } from '@chakra-ui/react'

/* ui  */
import { NewChatIcon, LogoutIcon, ContactsIcon, MenuIcon } from '@components/ui'
import { Animated, ContextMenu, ContextMenuItem, ContextMenuList } from '..'
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
        <ContextMenuItem icon={<NewChatIcon />} onClick={onNewChatSelect}>
          New chat
        </ContextMenuItem>
        <ContextMenuItem icon={<ContactsIcon />} onClick={onNewChatSelect}>
          Contacts
        </ContextMenuItem>
        <ContextMenuItem icon={<LogoutIcon />} onClick={onLogOutSelect}>
          Log out
        </ContextMenuItem>
      </>
    ),
    []
  )
  return (
    <Animated variants={ICON_ROTATE_ANIMATION} initial="hidden" animate="open" exit="hidden">
      <ContextMenu
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
      </ContextMenu>
    </Animated>
  )
}

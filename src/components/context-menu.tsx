/* lib  */
import React, { PropsWithChildren } from 'react'
import { Menu, MenuItem, MenuList, PlacementWithLogical, chakra } from '@chakra-ui/react'

export const ContextMenuList = chakra(MenuList, {
  baseStyle: {
    py: 2,
    px: 1,
    bg: 'rgb(255 255 255 / 73%)',
    backdropFilter: 'auto',
    backdropBlur: '10px',
    borderRadius: 10
  }
})

export const ContextMenuItem = chakra(MenuItem, {
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
    fontSize: '.875rem'
  }
})

interface ContextMenuProps extends PropsWithChildren {
  menuButton?: React.ReactElement
  placement?: PlacementWithLogical
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ placement, menuButton = null, children }) => {
  return (
    <Menu placement={placement}>
      {menuButton}
      <ContextMenuList>{children}</ContextMenuList>
    </Menu>
  )
}

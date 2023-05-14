/* lib */
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react'
import { Box, Menu, MenuItemProps, Portal } from '@chakra-ui/react'

/* ui  */
import { StyledMenuItem, StyledMenuList } from './menu'
import { Backdrop } from './backdrop'

interface ContextMenuContextParams {
  closeMenu: () => void
  openMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isOpen: boolean
}
export const ContextMenuContext = createContext({} as ContextMenuContextParams)

export const ContextMenuItem: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
  const { closeMenu } = useContext(ContextMenuContext)
  return (
    <StyledMenuItem
      onClick={e => {
        onClick && onClick(e)
        closeMenu()
      }}
      {...props}
    />
  )
}

interface ContextMenuProps extends PropsWithChildren {
  renderItems: React.ReactElement
}
export const ContextMenu: React.FC<ContextMenuProps> = ({ renderItems, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const MENU_PADDING = 20

  const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isOpen) {
      e.preventDefault()
      setIsOpen(true)
      const popper = menuRef.current?.parentElement
      const menuWidth = menuRef.current?.parentElement?.clientWidth

      if (!menuWidth) {
        return
      }
      if (popper) {
        let x = e.clientX + MENU_PADDING
        let y = e.clientY + MENU_PADDING
        Object.assign(popper.style, {
          top: `${y}px`,
          left: `${x}px`
        })
      }
    }
  }
  const closeMenu = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <ContextMenuContext.Provider value={{ closeMenu, openMenu, isOpen }}>
      {isOpen && <Backdrop onMouseDown={closeMenu} date-component-name="Backdrop" />}
      <Box onContextMenu={openMenu} data-component="ContextMenuTrigger">
        {children}
      </Box>

      <Menu isLazy isOpen={isOpen}>
        <Portal>
          <StyledMenuList ref={menuRef}>
            {/* menu items here */}
            {renderItems}
          </StyledMenuList>
        </Portal>
      </Menu>
    </ContextMenuContext.Provider>
  )
}

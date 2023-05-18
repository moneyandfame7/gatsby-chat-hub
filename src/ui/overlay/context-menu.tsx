/* lib */
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react'

import { Box, Menu, MenuItemProps, Portal } from '@chakra-ui/react'

import { Backdrop } from './backdrop'

/* ui  */
import { StyledMenuItem, StyledMenuList } from './menu'

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
			onClick={(e) => {
				onClick && onClick(e)
				closeMenu()
			}}
			{...props}
		/>
	)
}

interface ContextMenuProps extends PropsWithChildren {
	renderItems: React.ReactElement
	containerRef: React.RefObject<HTMLDivElement>
}
export const ContextMenu: React.FC<ContextMenuProps> = ({ renderItems, children, containerRef }) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const MENU_PADDING = 20

	const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (!isOpen) {
			e.preventDefault()
			setIsOpen(true)
			const popper = menuRef.current?.parentElement
			// 33*4+16+2 33 - height of 1 el, 4 - count of elements, 16 - menu padding, 2 - borders px
			if (!popper || !containerRef.current?.parentElement) {
				return
			}

			const { width: menuWidth, height: menuHeight } = popper.getBoundingClientRect()
			const { width: containerWidth, height: containerHeight } =
				containerRef.current.parentElement.getBoundingClientRect()

			let x = e.clientX + MENU_PADDING
			let y = e.clientY + MENU_PADDING

			if (menuWidth + x >= containerWidth) {
				x = containerWidth - menuWidth - MENU_PADDING
			}

			if (menuHeight * 2 + y >= containerHeight) {
				y = y - menuHeight - MENU_PADDING * 2
			}
			Object.assign(popper.style, {
				top: `${y}px`,
				left: `${x}px`,
				position: 'fixed',
			})
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
			{isOpen && <Backdrop onMouseDown={closeMenu} date-component-name='Backdrop' />}
			<Box ref={containerRef} onContextMenu={openMenu} data-component='ContextMenuTrigger'>
				{children}
			</Box>

			<Menu isOpen={isOpen}>
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

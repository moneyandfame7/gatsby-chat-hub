/* lib */
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react'

import { Box, Menu, MenuItemProps, Portal } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'

import { KeyboardEventKey } from '@utils/constants'
import { NullableField } from '@utils/types'

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
	container: NullableField<HTMLElement>
}
export const ContextMenu: React.FC<ContextMenuProps> = observer(
	({ container, renderItems, children, containerRef }) => {
		const [isOpen, setIsOpen] = useState(false)
		const menuRef = useRef<HTMLDivElement>(null)

		const { cacheStore } = useStores()

		const rtl = cacheStore.selectCache((cache) => cache.rtl)
		const MENU_PADDING = 10

		const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
			if (!isOpen) {
				e.preventDefault()
				setIsOpen(true)
				const popper = menuRef.current?.parentElement

				if (!popper || !container) {
					return
				}

				const { width: menuWidth, height: menuHeight } = popper.getBoundingClientRect()
				const {
					width: containerWidth,
					height: containerHeight,
					left: containerLeft,
				} = container.getBoundingClientRect()

				let x = e.clientX + MENU_PADDING
				let y = e.clientY + MENU_PADDING

				const rtlBoundary = x - containerLeft + menuWidth + MENU_PADDING
				if (!rtl && menuWidth + x >= containerWidth) {
					x = containerWidth - menuWidth - MENU_PADDING
				} else if (rtl && rtlBoundary > containerWidth) {
					x = containerWidth - menuWidth + containerLeft - MENU_PADDING
				}

				if (menuHeight + y >= containerHeight) {
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

		const handlePressEscape = (e: KeyboardEvent) => {
			if (e.code === KeyboardEventKey.Escape) {
				e.preventDefault()
				e.stopPropagation()
				closeMenu()
			}
		}

		return (
			<ContextMenuContext.Provider value={{ closeMenu, openMenu, isOpen }}>
				{isOpen && <Backdrop handler={handlePressEscape} onMouseDown={closeMenu} date-component-name='Backdrop' />}
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
)

/* lib */
import React, { useRef, type FC, useState, useEffect, PropsWithChildren, useContext } from 'react'
import { navigate, PageProps } from 'gatsby'
import { useLocation } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { Box, BoxProps, Button, Center, Menu, MenuItem, MenuList, ModalOverlay, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

/* services */
import { ContextMenuContext, ContextMenuItem, StyledMenuList, pageHead } from '@components'
import { ROUTES } from '@utils/constants'
import { DeleteIcon } from '@chakra-ui/icons'
import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from 'react-icons/md'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { Conversation } from '@utils/graphql/conversations'

/* ui */

/**
 *
 * @TODO винести бекдроп в окремий компонент плюс доробити менюшку
 *
 */

export const ContextMenuTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const { openMenu } = useContext(ContextMenuContext)
  return (
    <Box data-component-name="ContextMenuTrigger" onContextMenu={openMenu}>
      {children}
    </Box>
  )
}

const Root: FC<PageProps> = ({ location }) => {
  const constraintsRef = useRef(null)

  return (
    <Center alignItems="start" minH="100vh" gap={5}>
      <Center
        alignItems="start"
        as={motion.div}
        //@ts-ignore
        transition={{ duration: 5 }}
        minH="300px"
        minW="300px"
        borderRadius="20px"
        ref={constraintsRef}
        bg="blackAlpha.400"
      >
        <Text
          drag
          dragConstraints={constraintsRef}
          userSelect="none"
          as={motion.p}
          fontSize="3xl"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.5 }}
          color="#fff"
          onClick={() => {}}
        >
          <motion.button
            onClick={() => {
              navigate(ROUTES.chat())
            }}
          >
            Go chat
          </motion.button>
        </Text>
      </Center>
    </Center>
  )
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })

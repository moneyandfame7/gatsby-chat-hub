/* lib  */
import React, { FC, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Text, VStack } from '@chakra-ui/react'

/* services  */
import { useIsMobileScreen } from '@hooks'
import { ConversationContext } from '../layout'

export const ConversationInformation: FC = () => {
  const isMobileScreen = useIsMobileScreen()
  const { isInfoOpen, toggleInfo } = useContext(ConversationContext)
  /* Header */
  /* index.tsx */
  return (
    <AnimatePresence initial={false}>
      {isInfoOpen && (
        <VStack
          zIndex={10000}
          as={motion.div}
          pos={{ base: 'absolute', md: 'initial' }}
          right={0}
          initial={{ width: 0 }}
          animate={{ width: isMobileScreen ? '100%' : 300 }}
          exit={{ width: 0 }}
          margin="0px !important"
          w={{ base: '100%', md: '300px' }}
          bg="blue.100"
          h="100vh"
        >
          <motion.button animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileTap={{ scale: 1.2 }} onClick={toggleInfo}>
            {isInfoOpen ? 'Close' : 'Open'}
            <Text
              fontSize="xl"
              as={motion.p}
              animate={{ width: 'max-content' }}
              exit={{ width: 0 }}
              whiteSpace="nowrap"
            >
              User info
            </Text>
          </motion.button>
        </VStack>
      )}
    </AnimatePresence>
  )
}

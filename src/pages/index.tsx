/* lib */
import React, { useRef, type FC } from 'react'
import { navigate, PageProps } from 'gatsby'
import { useLocation } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { Center, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

/* services */
import { pageHead } from '@components'
import { ROUTES } from '@utils/constants'

/* ui */

const Root: FC<PageProps> = ({ location }) => {
  const reachLoc = useLocation()
  const constraintsRef = useRef(null)

  return (
    <Center minH="100vh" gap={5}>
      <Center
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

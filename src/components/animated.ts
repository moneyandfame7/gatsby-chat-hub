/* lib  */
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

const Animated = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

/**
 * @TODO add slide animation
 */
/**
 * @TODO a separate list of animations and layouts ( lists etc)
 */

export { Animated }

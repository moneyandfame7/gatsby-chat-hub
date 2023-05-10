/* lib  */
import React, { FC } from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'

/* assets  */
import logoPng from '@images/logo.png'

const Logo: FC = () => {
  return (
    <HStack>
      <Image width={25} height={25} src={logoPng} alt="ChatHub Logo" />
      <Text fontSize="medium" fontWeight={600}>
        ChatHub
      </Text>
    </HStack>
  )
}
export default Logo

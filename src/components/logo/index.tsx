import React, { FC } from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'gatsby-plugin-react-i18next'

import logoPng from '@images/logo.png'

const Logo: FC = () => {
  return (
    <Link to="/">
      <HStack>
        <Image width={25} height={25} src={logoPng} alt="ChatHub Logo" />
        <Text fontSize="medium" fontWeight={600}>
          ChatHub
        </Text>
      </HStack>
    </Link>
  )
}
export default Logo

import { useMediaQuery } from '@chakra-ui/react'

export const useIsMobileScreen = () => {
  return useMediaQuery('(max-width: 768px)')[0]
}

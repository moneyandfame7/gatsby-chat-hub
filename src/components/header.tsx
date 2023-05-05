import React, { FC } from 'react'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, HStack, Box } from '@chakra-ui/react'
import { MdLanguage } from '@react-icons/all-files/md/MdLanguage'

import Logo from './logo'
import { useStores } from '@store/provider'

export const Header: FC = () => {
  const { languages, originalPath, language } = useI18next()
  const { t } = useTranslation()
  const { authorizationStore } = useStores()
  return (
    <HStack position="fixed" top={0} left={0} right={0} py={5} px={10} justifyContent="space-between">
      <Logo />
      <Link to="/test/123">Go</Link>
      <HStack gap={2}>
        <Box>
          <Menu>
            <MenuButton colorScheme="facebook" as={Button} leftIcon={<Icon as={MdLanguage} />}>
              {language}
            </MenuButton>
            <MenuList minW="28" style={{ margin: 0, inset: '0px' }}>
              {languages.map(l => (
                <MenuItem key={l} as={Link} to={originalPath} language={l} fontWeight={600}>
                  {l}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        {authorizationStore.isLoggedIn && (
          <Button colorScheme="red" onClick={authorizationStore.logout}>
            {t('authorization.logout')}
          </Button>
        )}
      </HStack>
    </HStack>
  )
}

import React, { type FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Box } from '@chakra-ui/react'
import { graphql } from 'gatsby'

/* services */
import { useStores } from '@store/provider'

/* ui */
import { pageHead, Authorization, Chat } from '@components'
import { Header } from '@components/header'

const Root: FC = () => {
  const { userStore, authorizationStore } = useStores()

  return (
    <Box>
      <Header />
      {userStore.user?.username && authorizationStore.isLoggedIn ? <Chat /> : <Authorization />}
    </Box>
  )
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

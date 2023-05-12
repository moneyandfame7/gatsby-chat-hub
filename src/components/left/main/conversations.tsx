import React from 'react'

import { Animated } from '@components'
import { List } from '@components/ui'

import { SCALE_ANIMATION } from '.'
import { ConversationsData, CONVERSATIONS_QUERY } from '@utils/graphql/conversations'
import { useQuery } from '@apollo/client'

export const Conversations: React.FC = () => {
  const {
    data: all,
    loading: allLoad,
    subscribeToMore
  } = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
    fetchPolicy: 'cache-first'
  })
  const { data: unread, loading: unreadLoad } = useQuery<ConversationsData>(CONVERSATIONS_QUERY, {
    fetchPolicy: 'cache-first'
  })

  console.log({ all, unread })
  return (
    <Animated
      variants={SCALE_ANIMATION}
      initial="hidden"
      animate="open"
      exit="hidden"
      padding="inherit"
      left={0}
      top={0}
      bottom={0}
      pos="absolute"
      width="100%"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <List.Item
          key={i}
          avatar="https://lh3.googleusercontent.com/a/AGNmyxYAidE9aW3ECfmamrplKrVSCW9GYOXGFZpq02ZGMQ=s192-c-br100-rg-mo"
          to="#1234123412341234"
          title="Davyd"
          subtitle="lorem ipsum dolor sit amet, consectetur adipiscing el lorem et esse cillum dolor"
        />
      ))}
    </Animated>
  )
}

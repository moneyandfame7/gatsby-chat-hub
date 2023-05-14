/* lib  */
import React from 'react'

/* services  */
import { Conversation } from '@utils/graphql/conversations'

/* ui  */
import { ConversationItem } from './item'

interface ConversationsListProps {
  conversations: Conversation[]
}
export const ConversationsList: React.FC<ConversationsListProps> = ({ conversations }) => {
  return (
    <>
      {conversations.map(c => (
        <ConversationItem key={c.id} conversation={c} />
      ))}
    </>
  )
}

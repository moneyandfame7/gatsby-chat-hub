/* lib  */
import React from 'react'
import { useMutation } from '@apollo/client'
import { navigate } from 'gatsby'
import toast from 'react-hot-toast'
import { VStack } from '@chakra-ui/react'

/* services  */
import { useStores } from '@store/provider'
import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'
import { CreateConversationStep1 } from '../create-conversation/step-1'

interface ConversationModalProps {
  onOpen?: () => void
  isOpen?: boolean
  onClose?: () => void
  toggle?: () => void
}

export const CreateConversation: React.FC<ConversationModalProps> = ({ onClose, onOpen, isOpen, toggle }) => {
  /* step 2 */
  const { userStore } = useStores()

  const [createConversation, { loading: createConversationLoading }] = useMutation<
    CreateConversationResponse,
    CreateConversationInput
  >(CREATE_CONVERSATION)

  const onCreateConversation = async () => {
    const participantsIds = [userStore.user!.id, ...participants.map(p => p.id)]
    try {
      const { data } = await createConversation({
        variables: {
          participantsIds
        }
      })

      if (!data?.createConversation) {
        throw new Error('Failed to create conversation')
      }
      const {
        createConversation: { conversationId }
      } = data
      /* @TODO: переробити це */
      navigate(`/c#${conversationId}`)
      /**
       * Clear state on successfull creation
       */
      // setUsername('')
      // setParticipants([])
      onClose && onClose()
    } catch (e: any) {
      console.warn(e)
      toast.error(e.message)
    }
  }
  return (
    <>
      <CreateConversationStep1 />
    </>
  )
}

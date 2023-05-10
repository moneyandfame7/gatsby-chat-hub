/* lib  */
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { navigate } from 'gatsby'
import toast from 'react-hot-toast'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  Button,
  Tooltip,
  Badge
} from '@chakra-ui/react'

/* services  */
import { useDebounce } from '@hooks'
import { useStores } from '@store/provider'
import { SEARCH_USERS } from '@store/user/graphql'
import { CREATE_CONVERSATION, CreateConversationInput, CreateConversationResponse } from '@utils/graphql/conversations'
import type { SearchUsersInput, SearchUsersResponse, SearchedUser } from '@store/user/type'

/* ui  */
import { UserSearchList } from './search-list'
import { Participants } from './participants'

interface ConversationModalProps {
  onOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export const CreateConversationModal: React.FC<ConversationModalProps> = ({ onClose, onOpen, isOpen }) => {
  const [username, setUsername] = useState('')
  const [participants, setParticipants] = useState<SearchedUser[]>([])
  const { userStore } = useStores()
  const [searchUsers, { data, loading, error }] = useLazyQuery<SearchUsersResponse, SearchUsersInput>(SEARCH_USERS)
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
       * Clear state and close modal
       * on successfull creation
       */
      setUsername('')
      setParticipants([])
      onClose()
    } catch (e: any) {
      console.log({ e })
      toast.error(e.message)
    }
  }

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    await searchUsers({ variables: { username } })
  }

  const addParticipant = (user: SearchedUser) => {
    setParticipants(prev => [...prev, user])
  }

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(participant => participant.id !== id))
  }

  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const debouncedUsername = useDebounce(username, 500)
  useEffect(() => {
    ;(async () => {
      if (debouncedUsername.length > 0) {
        const data = await searchUsers({ variables: { username: debouncedUsername } })
      }
    })()
  }, [debouncedUsername])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent pb={4} bg="blue.300">
          <ModalHeader>Select users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input placeholder="Enter a username" value={username} onChange={handleChangeSearch} />
                <Button
                  type="submit"
                  color="whiteAlpha.800"
                  colorScheme="whiteAlpha"
                  isDisabled={!username}
                  isLoading={loading}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList users={data.searchUsers} addParticipant={addParticipant} participants={participants} />
            )}

            <>
              {participants.length !== 0 && (
                <Participants participants={participants} removeParticipant={removeParticipant} />
              )}
              <Tooltip label={participants.length < 1 ? 'Please select users' : ''} hasArrow>
                <Button
                  width="100%"
                  mt={6}
                  onClick={onCreateConversation}
                  isDisabled={createConversationLoading || participants.length < 1}
                  colorScheme="purple"
                  position="relative"
                >
                  Create Conversation
                  <Badge
                    position="absolute"
                    borderRadius="50%"
                    fontSize="medium"
                    px="10px"
                    py="5px"
                    top="-10px"
                    right="-10px"
                    variant="solid"
                    colorScheme="purple"
                  >
                    {participants.length}
                  </Badge>
                </Button>
              </Tooltip>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

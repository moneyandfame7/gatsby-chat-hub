/* lib  */
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { navigate } from 'gatsby'
import toast from 'react-hot-toast'
import { Variants } from 'framer-motion'
import {
  Input,
  IconButton,
  HStack,
  Text,
  Checkbox,
  VStack,
  Avatar,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

/* services  */
import { useDebounce } from '@hooks'
import { useStores } from '@store/provider'
import { SEARCH_USERS } from '@store/user/graphql'
import {
  CREATE_CONVERSATION,
  CreateConversationInput,
  CreateConversationResponse,
  Participant
} from '@utils/graphql/conversations'
import type { SearchUsersInput, SearchUsersResponse } from '@store/user/type'

/* ui  */
import { Animated, Loader } from '@components'
import { ConversationContext } from '@modules/chat/layout'
import { recommendations } from '@store/recommendations'
import { NullableField } from '@types'

interface ConversationModalProps {
  onOpen?: () => void
  isOpen?: boolean
  onClose?: () => void
  toggle?: () => void
}

interface SearchedUsersListProps {
  withCache: boolean
  users?: Participant[]
  selectParticipant: (p: Participant) => void
  participants: Participant[]
}

interface UsersListProps {
  users: Participant[]
  selectParticipant: (p: Participant) => void
  participants: Participant[]
}
const UsersList: React.FC<UsersListProps> = ({ users, selectParticipant, participants }) => {
  return (
    <React.Fragment>
      {users.map(user => (
        <HStack width="100%" key={user.id} borderRadius={8} _hover={{ bg: 'blackAlpha.50' }} cursor="pointer" py={1}>
          <Checkbox
            onChange={() => {
              selectParticipant(user)
            }}
            colorScheme="purple"
            px={3}
            value={user.id}
            isChecked={participants.includes(user)}
          />
          <Avatar fontSize={18} src={user.photo} />
          <VStack align="start" userSelect="none">
            <Text fontSize="sm" fontWeight={500}>
              {user.username}
            </Text>
            <Text margin="0px !important" fontSize="sm" color="text.secondary">
              {new Date().toTimeString()}
            </Text>
          </VStack>
        </HStack>
      ))}
    </React.Fragment>
  )
}
const SearchedUsersList: React.FC<SearchedUsersListProps> = memo(
  ({ withCache, participants, selectParticipant, users }) => {
    const showResult = () => {
      const { recentUsers } = recommendations

      switch (true) {
        case withCache && recentUsers.length > 0:
          return (
            <VStack align="start" width="100%">
              Clear recent
              <UsersList users={recentUsers} participants={participants} selectParticipant={selectParticipant} />
            </VStack>
          )
        case !!users && users?.length > 0:
          return <UsersList users={users!} participants={participants} selectParticipant={selectParticipant} />
        default:
          return null
      }
    }

    const finalResult = showResult()

    return <>{showResult() || 'Empty '}</>
  }
)
export const CreateConversation: React.FC<ConversationModalProps> = ({ onClose, onOpen, isOpen, toggle }) => {
  const [username, setUsername] = useState('')
  const { userStore } = useStores()
  const [searchUsers, { data, loading: searchLoading }] = useLazyQuery<SearchUsersResponse, SearchUsersInput>(
    SEARCH_USERS
  )
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
      onClose && onClose()
    } catch (e: any) {
      console.log({ e })
      toast.error(e.message)
    }
  }

  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    ;(async () => {
      if (debouncedUsername.length > 0) {
        const { data } = await searchUsers({ variables: { username: debouncedUsername } })

        if (data && data.searchUsers.length > 0) {
          recommendations.updateRecentUsers(data.searchUsers)
        }
      }
    })()
  }, [debouncedUsername])

  const { onConversationCreateClose } = useContext(ConversationContext)
  const otherContainer: Variants = {
    open: {
      x: 0,
      transition: { delay: 0.1, duration: 0.15 }
    },
    hidden: {
      x: '100%',
      transition: { duration: 0.2 }
    }
  }
  const [participants, setParticipants] = useState<Participant[]>([])

  const selectParticipant = (participant: Participant) => {
    if (participants.includes(participant)) {
      setParticipants(participants.filter(p => p.id !== participant.id))
    } else {
      setParticipants(prev => [...prev, participant])
    }
  }

  /* в окремий компонент */

  return (
    <>
      <Animated
        pos="absolute"
        top={0}
        left={0}
        zIndex={1}
        height="100%"
        width="100%"
        /* @ts-ignore  */
        variants={otherContainer}
        p={2}
        initial="hidden"
        animate="open"
        exit="hidden"
      >
        <HStack>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Close create conversation menu"
            bg="transparent"
            borderRadius="50%"
            color="text.secondary"
            fontSize={22}
            _hover={{
              bg: 'blackAlpha.50'
            }}
            onClick={onConversationCreateClose}
          />
          <Text flex={1} fontSize="lg" fontWeight={500}>
            Add Participants
          </Text>
        </HStack>
        <HStack>
          {participants.map(p => (
            <Text key={p.id}>{p.username}</Text>
          ))}
        </HStack>
        <InputGroup>
          <Input
            onChange={handleChangeSearch}
            pl={3}
            variant="flushed"
            placeholder="Who would you like to add?"
            _placeholder={{ fontSize: 14 }}
            focusBorderColor="#9BA0FD"
          />
          {searchLoading && (
            <InputRightElement>
              <Loader />
            </InputRightElement>
          )}
        </InputGroup>

        <VStack maxH="85vh" align="start" overflowY="scroll" py={2}>
          <SearchedUsersList
            withCache
            participants={participants}
            selectParticipant={selectParticipant}
            users={data?.searchUsers}
          />
        </VStack>
      </Animated>
    </>
  )
}

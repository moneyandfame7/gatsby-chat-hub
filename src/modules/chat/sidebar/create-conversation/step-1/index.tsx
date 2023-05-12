/* lib  */
import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { HStack, Text, Avatar, Checkbox, VStack, Center, Box } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'

/* services  */
import { useDebounce } from '@hooks'
import { ConversationContext } from '@modules/chat/layout'
import { cache } from '@store/cache'
import { SEARCH_USERS } from '@store/user/graphql'
import type { SearchUsersResponse, SearchUsersInput } from '@store/user/type'
import type { Participant } from '@utils/graphql/conversations'

/* ui */
import { Animated } from '@components'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CreateConversationStep1Header } from './header'

interface UsersListProps {
  users: Participant[]
  participants: Participant[]
  selectParticipant: (p: Participant) => void
}
const UsersList: React.FC<UsersListProps> = ({ users, participants, selectParticipant }) => {
  const [animationRef] = useAutoAnimate()
  return (
    <React.Fragment>
      <Box
        ref={animationRef}
        py={2}
        overflowY="scroll"
        height="85vh"
        pos="relative"
        _hover={{
          '::-webkit-scrollbar-thumb': {
            bg: 'blackAlpha.300'
          }
        }}
        sx={{
          '::-webkit-scrollbar': {
            width: '3px'
          },
          '::-webkit-scrollbar-thumb': {
            bg: 'transparent',
            borderRadius: '1px'
          }
        }}
      >
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
      </Box>
    </React.Fragment>
  )
}

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

export const CreateConversationStep1: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const debouncedUsername = useDebounce(username, 500)
  const [searchedUsers, setSearchedUsers] = useState<Participant[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchUsers, { data, loading }] = useLazyQuery<SearchUsersResponse, SearchUsersInput>(SEARCH_USERS)
  const { onConversationCreateClose } = useContext(ConversationContext)

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const selectParticipant = (participant: Participant) => {
    if (participants.includes(participant)) {
      setParticipants(participants.filter(p => p.id !== participant.id))
    } else {
      setParticipants(prev => [...prev, participant])
    }
  }

  const renderContent = (users: Participant[]) => {
    if (users.length < 1) {
      return (
        <Center height="85vh">
          <Text color="text.secondary">Sorry, nothing found.</Text>
        </Center>
      )
    }
    return <UsersList users={users} participants={participants} selectParticipant={selectParticipant} />
  }

  const onCancel = () => {
    setParticipants([])
    setSearchedUsers([])
    setUsername('')
    onConversationCreateClose()
  }

  useEffect(() => {
    if (!data?.searchUsers) {
      const cached = cache.recentUsers
      setSearchedUsers(cached)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (debouncedUsername.length !== 0) {
        const { data } = await searchUsers({ variables: { username: debouncedUsername } })

        if (data && data.searchUsers.length > 0) {
          cache.updateRecentUsers(data.searchUsers)
          setSearchedUsers(data.searchUsers)
        } else {
          setSearchedUsers([])
        }
      } else {
        const cachedUsers = cache.recentUsers
        setSearchedUsers(cachedUsers)
      }
    })()
  }, [debouncedUsername])

  return (
    /* @TODO SlideAnimated винести окремо */
    <Animated
      pos="absolute"
      top={0}
      left={0}
      zIndex={1}
      p={2}
      height="100%"
      width="100%"
      /* @ts-ignore  */
      variants={otherContainer}
      initial="hidden"
      animate="open"
      exit="hidden"
    >
      <CreateConversationStep1Header
        handleChangeSearch={handleChangeSearch}
        loading={loading}
        participants={participants}
        onCancel={onCancel}
      />
      {renderContent(searchedUsers)}
    </Animated>
  )
}

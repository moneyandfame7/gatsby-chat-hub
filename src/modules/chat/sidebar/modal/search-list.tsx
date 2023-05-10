/* lib  */
import React from 'react'
import { Avatar, Box, Button, Flex, Stack, Text } from '@chakra-ui/react'

/* services  */
import type { SearchedUser } from '@store/user/type'

interface UserSearchListProps {
  users: SearchedUser[]
  participants: SearchedUser[]
  addParticipant: (user: SearchedUser) => void
}

export const UserSearchList: React.FC<UserSearchListProps> = ({ users, addParticipant, participants }) => {
  return (
    <Box pt={5}>
      {!users.length ? (
        <Flex mt={6} justify="center">
          <Text fontWeight={500}>No users found</Text>
        </Flex>
      ) : (
        <Stack maxH="250px" overflowY="scroll">
          {users.map(u => (
            <Stack
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: 'whiteAlpha.200' }}
              cursor="pointer"
            >
              <Avatar src={u.photo} />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.800" fontWeight={500}>
                  {u.username}
                </Text>
                <Button
                  isDisabled={!!participants.find(p => p.id === u.id)}
                  onClick={() => {
                    addParticipant(u)
                  }}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  )
}

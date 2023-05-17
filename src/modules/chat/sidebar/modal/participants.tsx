/* lib  */
import React from 'react'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { IoMdRemoveCircleOutline } from '@react-icons/all-files/io/IoMdRemoveCircleOutline'

/* services  */
import type { SearchedUser } from '@store/user/type'

interface ParticipantsProps {
  participants: SearchedUser[]
  removeParticipant: (id: string) => void
}

export const Participants: React.FC<ParticipantsProps> = ({ participants, removeParticipant }) => {
  return (
    <Flex mt={8} maxH="100px" overflowY="scroll" gap="8px" wrap="wrap">
      {participants.map(p => (
        <HStack key={p.id} bg="whiteAlpha.200" p={2} borderRadius={4}>
          <Text userSelect="none">{p.username}</Text>
          <IoMdRemoveCircleOutline cursor="pointer" size={20} onClick={() => removeParticipant(p.id)} />
        </HStack>
      ))}
    </Flex>
  )
}

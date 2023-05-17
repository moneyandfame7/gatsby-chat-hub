/* lib  */
import React, { useContext } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { HStack, IconButton, InputGroup, Input, InputRightElement, Text } from '@chakra-ui/react'

/* services  */
import type { Participant } from '@utils/graphql/conversations'

/* ui  */
import { Loader } from '@components/loader'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface CreateConversationStep1HeaderProps {
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  participants: Participant[]
  onCancel: () => void
}
export const CreateConversationStep1Header: React.FC<CreateConversationStep1HeaderProps> = ({
  handleChangeSearch,
  loading,
  participants,
  onCancel
}) => {
  const [animationRef] = useAutoAnimate()
  return (
    <React.Fragment>
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
          onClick={onCancel}
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
      <InputGroup ref={animationRef}>
        <Input
          onChange={handleChangeSearch}
          pl={3}
          variant="flushed"
          placeholder="Who would you like to add?"
          _placeholder={{ fontSize: 14 }}
          focusBorderColor="#9BA0FD"
        />
        {loading && (
          <InputRightElement>
            <Loader />
          </InputRightElement>
        )}
      </InputGroup>
    </React.Fragment>
  )
}

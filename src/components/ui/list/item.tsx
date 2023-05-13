import React from 'react'
import { Link } from 'gatsby'
import { HStack, VStack, Badge, StackProps, Avatar, Text } from '@chakra-ui/react'

interface ListItemWrapper extends StackProps {
  to: string
  children: React.ReactNode
}
const ListItemWrapper: React.FC<ListItemWrapper> = ({ ...props }) => {
  return (
    <HStack
      borderRadius={8}
      _hover={{ bg: 'gray.100' }}
      cursor="pointer"
      p="9px"
      w="full"
      userSelect="none"
      as={Link}
      {...props}
    />
  )
}

interface ListItemAvatarProps {
  src: string
}
const ListItemAvatar: React.FC<ListItemAvatarProps> = ({ src }) => {
  return <Avatar src={src} />
}

interface ListItemTitleProps {
  subtitle: string
  date?: string
  title: string
  other?: string
}
const ListItemContent: React.FC<ListItemTitleProps> = ({ title, other, subtitle, date }) => {
  return (
    <VStack align="start" flex={1}>
      <HStack justify="space-between" w="full">
        <Text fontSize={16} fontWeight={600}>
          {title}
        </Text>
        <Text fontSize={12} color="text.secondary">
          {date}
        </Text>
      </HStack>
      <HStack w="full">
        <Text
          w="30px"
          overflowX="hidden"
          textOverflow="ellipsis"
          flex="1"
          fontSize={14}
          textColor="text.secondary"
          whiteSpace="nowrap"
        >
          {subtitle}
        </Text>
        {other && (
          <Badge transition="all 0.3s ease" borderTopRadius={2} borderRadius="0.75rem">
            {other}
          </Badge>
        )}
      </HStack>
    </VStack>
  )
}
interface ListItemProps {
  to: string
  avatar: string
  title: string
  subtitle: string
  date?: string
}
export const ListItem: React.FC<ListItemProps> = ({ avatar, title, subtitle, date, to }) => {
  return (
    <ListItemWrapper to={to}>
      <ListItemAvatar src={avatar} />
      <ListItemContent title={title} subtitle={subtitle} date={date} />
    </ListItemWrapper>
  )
}

import React from 'react'
import { useLocation } from '@reach/router'
import { HStack, VStack, Badge, StackProps, Avatar, Text, Divider } from '@chakra-ui/react'
import { navigate } from 'gatsby'

interface ListItemWrapper extends StackProps {
  to: string
  children: React.ReactNode
  isActive: boolean
}
const ListItemWrapper: React.FC<ListItemWrapper> = ({ isActive, to, ...props }) => {
  const { pathname, hash } = useLocation()
  return (
    <HStack
      bg={isActive ? 'purple.200' : 'none'}
      _hover={{ bg: isActive ? 'purple.200' : 'gray.50' }}
      cursor="pointer"
      p="9px"
      w="full"
      userSelect="none"
      onClick={e => {
        if (pathname + hash !== to) {
          navigate(to)
        }
      }}
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
  isActive: boolean
}
const ListItemContent: React.FC<ListItemTitleProps> = ({ isActive, title, other, subtitle, date }) => {
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
      <Divider borderColor={isActive ? 'transparent' : 'inherit'} />
    </VStack>
  )
}
interface ListItemProps {
  to: string
  avatar: string
  title: string
  subtitle: string
  date?: string
  isActive: boolean
}
export const ListItem: React.FC<ListItemProps> = ({ isActive, avatar, title, subtitle, date, to }) => {
  return (
    <ListItemWrapper to={to} isActive={isActive}>
      <ListItemAvatar src={avatar} />
      <ListItemContent isActive={isActive} title={title} subtitle={subtitle} date={date} />
    </ListItemWrapper>
  )
}

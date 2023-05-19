import React, { CSSProperties } from 'react'

import { navigate } from 'gatsby'

import { Avatar, AvatarProps, Badge, Checkbox, Divider, HStack, StackProps, Text, VStack } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { MotionConfig } from 'framer-motion'

interface ListItemWrapperProps extends StackProps {
	to?: string
	children: React.ReactNode
	isActive?: boolean
	isHoverable: boolean
}
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({ isActive, to, isHoverable, ...props }) => {
	const { pathname, hash } = useLocation()
	return (
		<HStack
			bg={isActive ? 'purple.200' : 'none'}
			_hover={{ bg: isHoverable ? (isActive ? 'purple.200' : 'blackAlpha.50') : 'initial' }}
			cursor={isHoverable ? 'pointer' : 'default'}
			p='9px'
			w='full'
			userSelect='none'
			gap={5}
			onClick={(e) => {
				if (to && pathname + hash !== to) {
					navigate(to)
				}
			}}
			{...props}
		/>
	)
}

interface ListItemAvatarProps {
	src?: string
	name?: string
	background?: AvatarProps['background']
}
export const ListItemAvatar: React.FC<ListItemAvatarProps> = ({ src, name, background }) => {
	return <Avatar pointerEvents='none' src={src} background={background} name={name} />
}

interface ListItemTitleProps {
	subtitle?: string
	date?: string
	title: string
	other?: string
	isActive?: boolean
}
const ListItemContent: React.FC<ListItemTitleProps> = ({ isActive, title, other, subtitle, date }) => {
	return (
		<VStack align='start' flex={1}>
			<HStack justify='space-between' w='full'>
				<Text
					fontSize={16}
					fontWeight={500}
					w='30px'
					flex={1}
					overflowX='hidden'
					textOverflow='ellipsis'
					whiteSpace='nowrap'
				>
					{title}
				</Text>
				<Text fontSize={12} color='text.secondary'>
					{date}
				</Text>
			</HStack>
			<HStack w='full'>
				{subtitle && (
					<Text
						w='30px'
						overflowX='hidden'
						textOverflow='ellipsis'
						flex='1'
						fontSize={14}
						textColor='text.secondary'
						whiteSpace='nowrap'
					>
						{subtitle}
					</Text>
				)}
				{other && (
					<Badge transition='all 0.3s ease' borderTopRadius={2} borderRadius='0.75rem'>
						{other}
					</Badge>
				)}
			</HStack>
			{typeof isActive !== 'undefined' && <Divider borderColor={isActive ? 'transparent' : 'inherit'} />}
		</VStack>
	)
}
interface ListItemProps {
	to?: string
	avatar: ListItemAvatarProps
	title: string
	subtitle?: string
	date?: string
	isActive?: boolean
	withCheckbox?: boolean
	isChecked?: boolean
	isHoverable?: boolean
}
export const ListItem: React.FC<ListItemProps & StackProps> = ({
	isActive,
	avatar,
	title,
	subtitle,
	date,
	to,
	withCheckbox = false,
	isChecked = false,
	isHoverable = true,
	...props
}) => {
	return (
		<ListItemWrapper to={to} isActive={isActive} isHoverable={isHoverable} {...props}>
			{withCheckbox && <Checkbox zIndex={-1} isChecked={isChecked} />}
			<HStack w='full'>
				<ListItemAvatar {...avatar} />
				<ListItemContent isActive={isActive} title={title} subtitle={subtitle} date={date} />
			</HStack>
		</ListItemWrapper>
	)
}

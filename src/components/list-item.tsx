import React from 'react'

import { navigate } from 'gatsby'

import {
	AvatarProps,
	Badge,
	Box,
	Center,
	Checkbox,
	Divider,
	HStack,
	Image,
	StackProps,
	SystemStyleObject,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useLocation } from '@reach/router'

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
			borderRadius={8}
			bg={isActive ? 'purple.200' : 'none'}
			_hover={{ bg: isHoverable ? (isActive ? 'purple.200' : 'blackAlpha.50') : 'initial' }}
			cursor={isHoverable ? 'pointer' : 'default'}
			p='9px'
			w='full'
			userSelect='none'
			gap={5}
			onClick={(e) => {
				if (to && pathname + hash !== to) {
					navigate(to, { replace: true })
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
	size?: 'large' | 'medium' | 'small'
}
export const ListItemAvatar: React.FC<ListItemAvatarProps> = ({ src, name, background, size = 'large' }) => {
	const baseStyles: SystemStyleObject = {
		borderRadius: '50%',
		pointerEvents: 'none',
	}
	const getWidth = () => {
		switch (size) {
			case 'large':
				return {
					width: '50px',
					height: '50px',
					fontSize: '20px',
				}
			case 'medium':
				return {
					width: '40px',
					height: '40px',
				}
			case 'small':
				return {
					width: '30px',
					height: '30px',
				}
		}
	}
	const renderContent = () => {
		switch (Boolean(src)) {
			case true:
				return (
					<Box
						sx={{
							...baseStyles,
							...getWidth(),
						}}
					>
						<Image width='100%' height='100%' src={src} alt={name} />
					</Box>
				)
			case false:
				return (
					<Center
						sx={{
							...baseStyles,
							...getWidth(),
						}}
						bg={background}
						fontWeight={600}
						textTransform='uppercase'
						color='#fff'
					>
						{name?.slice(0, 2)}
					</Center>
				)
		}
	}

	return <>{renderContent()}</>
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
			{withCheckbox && <Checkbox pointerEvents='none' userSelect='none' isChecked={isChecked} />}
			<HStack w='full'>
				<ListItemAvatar {...avatar} />
				<ListItemContent isActive={isActive} title={title} subtitle={subtitle} date={date} />
			</HStack>
		</ListItemWrapper>
	)
}

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Image as ChakraImage, Flex, Link, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@services/store'
import { CachedMessage } from '@services/store/cache'

import { Animation } from '@components/animation'

interface MessageProps {
	message: CachedMessage
}

export interface LinkMetadata {
	description: string
	domain: string
	duration: number
	images: string[]
	title: string
	url: string
}

interface LinkPreviewProps {
	message: CachedMessage
	url?: string
}
const LinkPreview: React.FC<LinkPreviewProps> = observer(({ url, message }) => {
	const { cacheStore } = useStores()
	const [linkData, setLinkData] = useState<LinkMetadata | undefined>(message.meta)

	const getMeta = (url: string): Promise<HTMLImageElement> =>
		new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = () => resolve(img)
			img.onerror = (err) => reject(err)
			img.src = url
		})
	/**
	 * @todo записувати розмір картинок? якщо картинка меньше 601 пікселя - то в повний розмір чи які
	 */
	/**
	 * @todo custom scrollbar
	 */
	useEffect(() => {
		if (!linkData && url) {
			;(async () => {
				const response = await fetch(`https://jsonlink.io/api/extract?url=${url}`)

				const metadata = (await response.json()) as LinkMetadata

				setLinkData(metadata)
				cacheStore.updateMessageById({
					id: message.content.id,
					message: {
						meta: metadata,
					},
				})
			})()
		}
	}, [linkData])

	const hasSomeContent = Boolean(linkData?.title || linkData?.description || linkData?.images[0])

	return (
		<>
			{hasSomeContent && (
				<Box mt={2}>
					<Flex h='full'>
						<Flex p={2} borderLeft='2px solid' borderColor='purple' flexDir='column' justify='space-between' h='full'>
							{linkData?.title && (
								<Link href={linkData.url} fontWeight={600} fontSize={13} target='_blank'>
									{linkData.title}
								</Link>
							)}
							{linkData?.description && (
								<Text flex={1} fontSize={12}>
									{linkData.description}
								</Text>
							)}
						</Flex>
						{linkData?.images[0] && <ChakraImage src={linkData?.images[0]} width={150} borderRadius={12} />}
					</Flex>
				</Box>
			)}
		</>
	)
})

const REGEXP_INCLUDES_LINKS = /((?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)/g
const DEFAULT_PROTOCOL = 'http://'

export const Message: React.FC<MessageProps> = observer(({ message }) => {
	const { userStore } = useStores()
	const me = userStore.user

	const getPropsForPreview = useMemo(() => {
		const firstLink = message.content.text.match(REGEXP_INCLUDES_LINKS)?.[0]
		const url = !firstLink ? undefined : !firstLink.startsWith('http') ? DEFAULT_PROTOCOL + firstLink : firstLink

		return { url, message }
	}, [])
	const renderContent = useCallback(() => {
		const parts = message.content.text.split(REGEXP_INCLUDES_LINKS)

		return (
			<Box>
				{parts.map((part, i) => {
					if (REGEXP_INCLUDES_LINKS.test(part)) {
						let newUrl = part
						if (!part.startsWith('http')) {
							newUrl = DEFAULT_PROTOCOL + part
						}

						return (
							<Link color='blue.600' key={i} href={newUrl} target='_blank'>
								{part}
							</Link>
						)
					}
					return <React.Fragment key={i}>{part}</React.Fragment>
				})}
				{Boolean(getPropsForPreview.url) && <LinkPreview {...getPropsForPreview} />}
			</Box>
		)
	}, [message.content.text])

	return (
		<Box w='full'>
			<Flex py='6px' justifyContent={me ? 'end' : 'start'}>
				<Animation
					borderRadius={12}
					borderBottomRightRadius={me ? 0 : 12}
					borderBottomLeftRadius={!me ? 0 : 12}
					bg={me ? 'primary.light' : 'white'}
					px={2}
					py={1}
					alignSelf={me ? 'end' : 'start'}
					alignItems='end'
					maxWidth='480px'
					fontSize='15px'
					pos='relative'
				>
					<Box color='black' whiteSpace='pre-wrap' wordBreak='break-word' lineHeight={1.3} pos='relative'>
						{renderContent()}

						<Text
							as='span'
							color='text.secondary'
							fontSize='10px'
							fontWeight={500}
							fontStyle='italic'
							float='right'
							pos='relative'
							width='30px'
							height='13px'
							mt='10px'
							ml='5px'
						>
							14:33
						</Text>
					</Box>
				</Animation>
			</Flex>
		</Box>
	)
})

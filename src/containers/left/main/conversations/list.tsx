import React, { memo } from 'react'

import { useIsAnimated } from '@services/hooks'

import { Animation } from '@components/animation'

import { Conversation } from '@utils/graphql/conversations'

import { ConversationItem } from './item'

interface ConversationsListProps {
	conversations: Conversation[]
	containerRef: React.RefObject<HTMLDivElement>
}
export const ConversationsList: React.FC<ConversationsListProps> = memo(({ conversations, containerRef }) => {
	const isAnimated = useIsAnimated()
	return (
		<>
			{conversations.map((c) => (
				<Animation.Fade key={c.id} layout={isAnimated ? true : undefined}>
					<ConversationItem containerRef={containerRef} conversation={c} />
				</Animation.Fade>
			))}
		</>
	)
})

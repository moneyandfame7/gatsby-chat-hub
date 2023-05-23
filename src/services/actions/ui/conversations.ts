import { useStores } from '@services/store'

import { Conversation } from '@utils/graphql/conversations'

export enum AvatarVariants {
	Tranquil = 'tranquil',
	PurpleWhite = 'purpleWhite',
	Suzy = 'suzy',
	paleWood = 'paleWood',
}

const AVATAR_VARIANTS: Record<AvatarVariants, string> = {
	tranquil: 'linear-gradient(to right, #EF629F, #EECDA3)',

	purpleWhite: 'linear-gradient(to right, #ba5370, #f4e2d8)',

	suzy: 'linear-gradient(to right, #834d9b, #d04ed6)',

	paleWood: 'linear-gradient(to top, #eacda3, #d6ae7b)',
}
export function useConversationAvatar(conversation: Conversation) {
	const { userStore } = useStores()

	const variant = AvatarVariants.Suzy
	if (conversation.participants.length > 2) {
		return {
			name: conversation.name,
			background: AVATAR_VARIANTS[variant],
		}
	}
	const participantWithoutMe = conversation.participants.filter((p) => p.id !== userStore.user?.id)[0]
	return {
		name: participantWithoutMe.username,
		src: participantWithoutMe.photo,
	}
}

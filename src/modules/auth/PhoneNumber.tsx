import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Box, Center, Button as ChakraButton, Checkbox, Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { windowStore } from '@services/window.store'

import type { LanguageCode, WithAuthProps } from '@types'

import { Button } from '@components/shared/buttons'
import { InputText } from '@components/shared/input'
import { TestComponent } from '@components/test'

import { useI18N, useTranslate, useTranslateForString } from '@utils/i18n'

const ContinueOnLanguageButton: FC = () => {
	const i18n = useI18N()

	const [wasChanged, setWasChanged] = useState(false)
	const [loading, setLoading] = useState(false)
	const handleChangeLanguage = () => {
		setLoading(true)
		if (windowStore.language) {
			i18n.setLang(windowStore.language).then(() => {
				setLoading(false)
				setWasChanged(true)
			})
		}
	}

	const translate = useTranslateForString('Auth.ContinueOnLanguage', windowStore.language)

	return (
		<>
			{windowStore.language && !wasChanged && (
				<Button mt={10} onClick={handleChangeLanguage} isText isLoading={loading} loadingText={i18n.get('Wait')}>
					{translate}
				</Button>
			)}
		</>
	)
}
interface AuthPhoneNumberProps extends WithAuthProps {}
export const AuthPhoneNumber: FC<AuthPhoneNumberProps> = ({ handleUpdateParams, isLoading }) => {
	const [phone, setPhone] = useState('')
	const [country, setCountry] = useState('')
	const handleChangeCountry = () => {}

	const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(e.currentTarget.value)
	}
	const t = useTranslate()

	return (
		<Center h='100vh' maxW='400px' w='100%' mx='auto' p={3}>
			<TestComponent />
			<Box>
				<Text textAlign='center' fontWeight={500} fontSize={{ base: 24, md: 34 }}>
					ChatHub
				</Text>
				<Text color='text.secondary' fontSize={{ base: 14, md: 16 }} textAlign='center' mb={{ base: 10, md: 20 }}>
					{t('Auth.Start')}
				</Text>
				<VStack w='full' gap={4} mb={5} px={2}>
					<InputText label='Country' value={country} onChange={(e) => {}} />
					<InputText label='Your phone number' value={phone} onChange={handleChangePhone} />
				</VStack>
				<Checkbox w='full' gap={10} px={5} defaultChecked>
					Keep me signed in
				</Checkbox>
				<ContinueOnLanguageButton />
			</Box>
		</Center>
	)
}

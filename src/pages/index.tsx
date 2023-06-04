import React, { ChangeEvent, type FC, memo, useEffect, useState } from 'react'

import { PageProps } from 'gatsby'

import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { observer, useLocalObservable } from 'mobx-react-lite'

import { Auth } from '@modules/auth/Auth'
import { LockScreen } from '@modules/lock/LockScreen'
import { Main } from '@modules/main/Main'

import { Api } from '@api'

import { AppScreens, LanguageCode } from '@types'

import { pageHead } from '@components/page-head'
import { TestComponent } from '@components/test'
import { Transition } from '@components/transition'

import { setLanguage, useI18N, useLanguages, useTranslate } from '@utils/i18n'

const Test: FC = () => {
	const renderContent = () => {
		return <>SUKA</>
	}
	return <Transition isActive>{renderContent()}</Transition>
}

const Root: FC<PageProps> = memo(({ location }) => {
	const hasStoredSession = false
	const isScreenLocked = false
	const [currentScreen, setCurrentScreen] = useState<AppScreens>()
	useEffect(() => {
		if (isScreenLocked) {
			setCurrentScreen(AppScreens.Lock)
		} else if (hasStoredSession) {
			setCurrentScreen(AppScreens.Main)
		} else {
			setCurrentScreen(AppScreens.Auth)
		}
	}, [isScreenLocked, hasStoredSession])

	const renderContent = () => {
		switch (currentScreen) {
			case AppScreens.Auth:
				return <Auth key={AppScreens.Auth} />
			case AppScreens.Lock:
				return <LockScreen key={AppScreens.Lock} />
			case AppScreens.Main:
				return <Main key={AppScreens.Main} />
		}
	}

	return (
		// <Flex flexWrap='wrap' alignItems='start' minH='100vh' gap={5}>
		<Transition activeKey={currentScreen?.toString()}>{renderContent()}</Transition>
		// </Flex>
	)
})

export default Root

export const Head = pageHead({ title: 'Home' })

import React, { FC, useCallback, useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import { AuthParams } from 'src/api/stores/auth'

import { Api } from '@api'

import { AuthScreens } from '@types'

import { Transition } from '@components/transition'

import { AuthPassword } from './Password'
import { AuthPhoneNumber } from './PhoneNumber'
import { AuthPincode } from './Pincode'

export const Auth: FC = observer(() => {
	const { updateParams, loading, params } = Api.auth

	const handleUpdateParams = useCallback(
		(params: AuthParams) => {
			updateParams(params)
		},
		[updateParams]
	)

	useEffect(() => {
		console.log('Update one field:', { params })
	}, [params])

	const renderScreen = () => {
		switch (Api.auth.screen) {
			case AuthScreens.WaitPassword:
				return (
					<AuthPassword
						key={AuthScreens[AuthScreens.WaitPassword]}
						handleUpdateParams={handleUpdateParams}
						isLoading={loading}
					/>
				)
			case AuthScreens.WaitPhoneNumber:
				return (
					<AuthPhoneNumber
						key={AuthScreens[AuthScreens.WaitPhoneNumber]}
						handleUpdateParams={handleUpdateParams}
						isLoading={loading}
					/>
				)
			case AuthScreens.WaitPincode:
				return (
					<AuthPincode
						key={AuthScreens[AuthScreens.WaitPincode]}
						handleUpdateParams={handleUpdateParams}
						isLoading={loading}
					/>
				)
		}
	}

	return (
		<Transition activeKey={AuthScreens[Api.auth.screen]}>
			{renderScreen()}
		</Transition>
	)
})

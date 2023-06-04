import React, {FC, useCallback} from 'react';

import {Box} from '@chakra-ui/react';
import {observer} from 'mobx-react-lite';

import {WithAuthProps} from '@types';

import {PasswordForm} from '@components/PasswordForm';

interface AuthPasswordProps extends WithAuthProps {}

export const AuthPassword: FC<AuthPasswordProps> = observer(
	({handleUpdateParams, isLoading}) => {
		return (
			<Box height='100%' border='1px solid green'>
				<PasswordForm
					onSubmit={(password) => {
						handleUpdateParams({password});
					}}
					isLoading={isLoading}
				/>
			</Box>
		);
	}
);

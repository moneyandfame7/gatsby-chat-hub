import { MutationOptions, gql } from '@apollo/client'

import { client } from '@services/apollo/clients'
import { LOGIN_MUTATION } from '@services/store/authorization/graphql'

export const signIn = ({ aboba }: { aboba: number }) =>
	client.mutate({
		mutation: LOGIN_MUTATION,
		variables: {},
	})

export const sendCode = ({ phoneNumber }: { phoneNumber: string }) =>
	client.mutate({
		mutation: LOGIN_MUTATION,
		variables: {},
	})

export const signOut = ({ test }: { test: string }) =>
	client.mutate({
		mutation: LOGIN_MUTATION,
		variables: {},
	})

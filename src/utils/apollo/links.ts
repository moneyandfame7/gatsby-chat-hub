import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { Environment } from '@utils/environment'

import { getAccessToken } from './helpers'

export const httpLink = () =>
  createHttpLink({
    uri: Environment.apiUrl()
  })

export const errorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
      }
    }
    if (networkError) {
      console.log('[Network Error]: ', networkError)
    }
  })

export const linkTokenToHeaders = () =>
  setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken()

    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    }
  })

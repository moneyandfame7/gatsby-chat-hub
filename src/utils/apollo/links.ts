import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { Logger } from '@utils/logger'
import { Environment } from '@utils/environment'

import { getAccessToken } from './helpers'

export const httpLink = () =>
  createHttpLink({
    uri: Environment.apiUrl()
  })

export const errorLink = () =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        Logger.error({ title: err.message })
      }
    }
    if (networkError) {
      Logger.error({
        title: `[Network Error]:`,
        value: networkError
      })
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
